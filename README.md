## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## ENDPOINTS

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
      questions: [
        {
          id: Integer,
          question: String
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
      question: String
    }


## Technologies:
  Create-react-app was used to create the front end. The app utilizes a RESTful API pattern created with Postgresql, ExpressJS and NodeJS.
