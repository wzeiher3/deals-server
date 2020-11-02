'use strict'
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const jwt = require('jsonwebtoken')
const { makeAuthHeader } = require('./test-helpers')

describe('Testing Deals', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db);
  })


  // prepare databases for each test.
  after('disconnect from db', () => db.destroy())

  before('clean the table', () => helpers.cleanTables(db))
  
  afterEach('cleanup', () =>  helpers.cleanTables(db))
  
  describe(`GET /deals`, () => {
    const testUsers = helpers.makeUsersArray()
    const testUser = testUsers[0]

    context('Given there are deals in the database', () => {
      const testDeals = helpers.makeDealsArray()
      
      beforeEach('insert deals and answers', () => {
        return db
          .into('deals_users')
          .insert(testUsers)
          .then(() => {
            return db
              .into('deals_table')
              .insert(testDeals);
          });
      });

      it('responds with 200 and all of the deals', () => {
        return supertest(app)
          .get('/deals')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200, testDeals)
      })
    })
  })

  describe(`GET /deals/:dealId`, () => {
    const testUsers = helpers.makeUsersArray()
    const testUser = testUsers[0]
    context(`Given no deals`, () => {
      it(`responds with 404`, () => {
        const dealId = 1
        return supertest(app)
          .get(`/deals/${dealId}`)
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(401, { error: 'Unauthorized request' })
      })
    })

    context('Given there are deals in the database', () => {
      const testDeals = helpers.makeDealsArray()

      beforeEach('insert deals and answers', () => {
        return db
          .into('deals_users')
          .insert(testUsers)
          .then(() => {
            return db
              .into('deals_table')
              .insert(testDeals);
          });
      });

      it('responds with 200 and the specified deal', () => {
        const dealId = 1
        const expectedDeal = testDeals[dealId - 1]
        return supertest(app)
          .get(`/deals/${dealId}`)
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200, expectedDeal)
      })
      
    });   
  })
  describe(`POST /login`, () => {
    const testUsers = helpers.makeUsersArray()
    const testUser = testUsers[0]
    
    beforeEach('insert users', () =>
      helpers.seedUsers(
        db,
        testUsers
      )
    )

    const requiredFields = ['user_name', 'password'];

    requiredFields.forEach(field => {
      const loginAttemptBody = {
        user_name: testUser.user_name,
        password: testUser.password,
      }     
      
      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete loginAttemptBody[field];

        return supertest(app)
          .post('/login')
          .send(loginAttemptBody)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })
      it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
        const userValidCreds = {
          user_name: testUser.user_name,
          password: testUser.password,
        }
        const expectedToken = jwt.sign(
          { user_id: testUser.id },
          process.env.JWT_SECRET,
          {
            subject: testUser.user_name,
            algorithm: 'HS256',
          }
        )
        return supertest(app)
          .post('/login')
          .send(userValidCreds)
          .expect(200, {
            authToken: expectedToken,
          })
      })
    })

  }) 
})