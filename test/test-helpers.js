function makeUsersArray() {
    return [
      {
        id: 1,
        user_name: 'test-user-1',
        password: 'password',
      },
      {
        id: 2,
        user_name: 'test-user-2',
        password: 'password',

      },
      {
        id: 3,
        user_name: 'test-user-3',
        password: 'password',
      },
      {
        id: 4,
        user_name: 'test-user-4',
        password: 'password',
      },
    ]
  }
  
  function makeDealsArray() {
    const users = makeUsersArray();
    return [
      {
        id: 1,
        name: 'First test thing!',
        distance: 2,
        user_id: users[0].id,
        price: 4,
        day: "Monday",
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
      {
        id: 2,
        name: 'Second test thing!',
        distance: 2,
        user_id: users[1].id,
        price: 4,
        day: "Tuesday",
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
      {
        id: 3,
        name: 'Third test thing!',
        distance: 1,
        user_id: users[2].id,
        price: 4,
        day: "Thursday",
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
      {
        id: 4,
        name: 'Fourth test thing!',
        distance: 2,
        user_id: users[3].id,
        price: 4,
        day: "Friday",
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
    ]
  }
  
//   function makeExpectedThing(users, thing, reviews=[]) {
//     const user = users
//       .find(user => user.id === thing.user_id)
  
//     const thingReviews = reviews
//       .filter(review => review.thing_id === thing.id)
  
//     const number_of_reviews = thingReviews.length
//     const average_review_rating = calculateAverageReviewRating(thingReviews)
  
//     return {
//       id: thing.id,
//       distance: thing.distance,
//       name: thing.name,
//       content: thing.content,
//       price: thing.price,
//       number_of_reviews,
//       average_review_rating,
//       user: {
//         id: user.id,
//         user_name: user.user_name,
//         full_name: user.full_name,
//         nickname: user.nickname,
//         price: user.price,
//       },
//     }
//   }
  
  
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

  
  module.exports = {
    makeUsersArray,
    makeDealsArray,
    // makeExpectedThing,
  
    makeDealsFixtures,
    seedDealsTables,
  }
  