# NomNom

A full stack JavaScript web application for users who are hungry and do not know where to eat.  

I decided to build this web application because of my love for food and trying new restaurants/locations.  Typically, I would use yelp to decide where I should eat with my friends however, we would always have trouble deciding a location since there were always a lot of options.  One day, I had a thought that it would be cool if yelp could somehow limit the number of choices or just pick a location for the user.  I had this idea way before I started my journey into coding.  As I began to learn the necessary technologies to make a web application, I happily decided to pursue my take on a web application for hungry people.  

## Technologies Used
* HTML5
* CSS3
* JavaScript
* React
* Node.js
* Express.js
* Babel
* Webpack
* PostgreSQL
* Dotenv
* Argon2
* Node-Fetch
* [Twilio](https://www.twilio.com/)
* [React-Google-Maps](https://www.npmjs.com/package/@react-google-maps/api)
* [Yelp](https://www.yelp.com/developers/documentation/v3/get_started)

## Live Demo
Try the live demo [here](https://nomnom-project.herokuapp.com/#)

## Features
* User can set their preferences on types of food and location
* User can try for another recommendation
* User can view the location on a map using google maps api
* User can read the reviews and ratings of a location
* User can have the app text the address of the location they are interested in to their phone
* User can create an account
* User can sign in
* User can sign out

## Preview 
![final-project-preview](https://user-images.githubusercontent.com/90667339/156860426-cd554783-3331-466a-a88b-fcf0bd8b2d63.gif)
![final-project-preview II](https://user-images.githubusercontent.com/90667339/156860505-8611299a-39de-4662-9e1f-0241ccfc6026.gif)

### System Requirements
* Node.js
* NPM
* Postgres

## Getting Started
1. Clone the repository.
  ```shell
    git@github.com:edtan094/nomnom.git
    cd nomnom
  ```
2. Install all dependencies with NPM. 
  ```shell
  npm install
  ```
3. Make a copy of the .env.example file.
  ```shell
  cp .env.example .env
  ```
4. Start postgreSQL
  ```shell
  sudo service postgresql start
  ```
5. Create a new database
  ```shell
  createdb nomnom
  ```
6. Import the example database to postgreSQL
  ```shell
  npm run db:import
  ```
7. Start the database (optional - if pgweb is installed)
  ```shell
  pgweb --db=nomnom
  ```
8. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser
  ```shell
  npm run dev
  ```

