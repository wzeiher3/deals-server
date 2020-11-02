'use strict';
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../src/config');
function makeUsersArray() {
    return [
      {
        id: 1,
        user_name: 'test-user-1',
        password: 'StickyPassword1',
      },
      {
        id: 2,
        user_name: 'test-user-2',
        password: 'Jm0n3yeet',

      },
      {
        id: 3,
        user_name: 'test-user-3',
        password: 'Y0queroTacoBell',
      },
      {
        id: 4,
        user_name: 'test-user-4',
        password: 'YuhTrain69',
      },
    ]
  }
  
  function makeDealsArray() {
    const users = makeUsersArray();
    return [
      {
        name: 'First test thing!',
        distance: 2,
        price: 4,
        day: "Monday",
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
      {
        name: 'Second test thing!',
        distance: 2,
        price: 4,
        day: "Tuesday",
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
      {
        name: 'Third test thing!',
        distance: 1,
        price: 4,
        day: "Thursday",
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
      {
        name: 'Fourth test thing!',
        distance: 2,
        price: 4,
        day: "Friday",
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
    ]
  }
  
  
  function makeDealsFixtures() {
    const testUsers = makeUsersArray()
    const testDeals = makeDealsArray(testUsers)
    
    return { testUsers, testDeals}
  }
  
  
  function seedDealsTables(db, users, deals) {
    return db
      .into('deals_users')
      .insert(users)
      .then(() =>
        db
          .into('deals_table')
          .insert(deals)
      )
  }


  function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    console.log(JWT_SECRET)
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.user_name,
      algorithm: 'HS256',
    })
    return `Bearer ${token}`
  }

  function cleanTables(db) {
    return db.raw(
      `TRUNCATE
        deals_table,
        deals_users
        RESTART IDENTITY CASCADE`
    )
  }

  
  module.exports = {
    makeUsersArray,
    makeDealsArray,
    cleanTables,
    makeAuthHeader,
    makeDealsFixtures,
    seedDealsTables,
  }
  