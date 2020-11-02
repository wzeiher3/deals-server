## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## ENDPOINTS

### POST /users
    
    // req.body
    {
      username: String,
      password: String
    }

    // res.body
    {
      id: Integer,
      username: String,
    }


### POST /login
 
    // req.body
    {
      username: String,
      password: String
    }

    // res.body

    {
      authToken: String,
      user: String
    }
  


### GET /deals

    // res.body
    {
      deal: [
        {
          id: Integer,
          name: String, 
          price: Integer, 
          day: String, 
          user_id: Integer, 
          content: String, 
          distance: Integer
        }
      ],
    }


### GET /deals/:dealId

    // req.params
    {
      id: ID
    }

    // res.body
    {
       id: Integer,
          name: String, 
          price: Integer, 
          day: String, 
          user_id: Integer, 
          content: String, 
          distance: Integer
    }


## Technologies:
  Create-react-app was used to create the front end. The app utilizes a RESTful API pattern created with Postgresql, ExpressJS and NodeJS.
