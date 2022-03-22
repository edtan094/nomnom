# NomNom

A full stack JavaScript web application for users who are hungry and do not know where to eat.  

I decided to build this web application because of my love for food and trying new restaurants/locations.  Typically, I would use yelp to decide where I should eat with my friends however, we would always have trouble deciding on a location since there were always a lot of options to pick from.  One day, I had a thought that it would be cool if yelp could somehow limit the number of choices or just pick a location for the user.  I had this idea way before I started my journey into coding.  As I began to learn the necessary technologies to make a web application, I happily decided to pursue my take on a web application for hungry people.  

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
* User can read the reviews and ratings of a location (yelp api provides reviews up to a certain word length. The rest of the review is cut off)
* User can have the app text the address of the location they are interested in to their phone
* User can create an account
* User can sign in
* User can sign out

## Stretch Features (completed)
* User can add a bookmark
* User can view a list of bookmarks
* User can remove a bookmark

## Preview 
![NomNom-preview](https://user-images.githubusercontent.com/90667339/159589713-d506e9c2-36ef-4d7c-a3e3-d2413842e591.gif)
![NomNom-preview-II](https://user-images.githubusercontent.com/90667339/159589731-4886e745-e58d-48c8-9838-0cc67d5c3348.gif)

# Development


### System Requirements
* Node.js 16 or higher
* NPM 8 or higher
* Postgres

## Getting Started
1. Clone the repository.
  ```shell
    git clone git@github.com:edtan094/nomnom.git
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
7. View the database (optional - if pgweb is installed)
  ```shell
  pgweb --db=nomnom
  ```
8. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser
  ```shell
  npm run dev
  ```

