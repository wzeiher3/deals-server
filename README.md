## Link to deployed project
https://deals-tracker-app.wzeiher3.vercel.app/

## Screenshots

![deals App SS](https://user-images.githubusercontent.com/56980103/97820036-34103f80-1c7a-11eb-8514-5e059d7dc518.png)


![SS deals-2](https://user-images.githubusercontent.com/56980103/97820116-92d5b900-1c7a-11eb-872c-7f14655a6b6f.png)


![SS deals-3](https://user-images.githubusercontent.com/56980103/97820305-8e5dd000-1c7b-11eb-8259-d16110918a52.png)

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
