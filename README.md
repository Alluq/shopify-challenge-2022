# Shopify 2022 Challenge

## Hey There! :wave: 
My name is Allen Lu and this is my submission for the 2022 Shopify Challenge!

For this challenge I implemented CRUD functionality and also the ability to add items to groups.

My project currently uses **Express.js** for the backend and Pug as the templating engine.


## Technologies
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)


## How to run the project :rocket:

First of all you need to make sure that you have Node and NPM installed (I'm using Node 16.13.1 and NPM v7.24.0)

1. In order to run the program please check out https://nodejs.org/en/download/ for more details on how to install node and npm on your device.

2. Afterwards, please clone this repo via:
`git clone https://github.com/Alluq/shopify-challenge-2022.git`

3. Then you need to go into your project root (i.e the project you just ran, it should have the file `package.json` in it) and you need to run `npm install`

4. After you've ran `npm install` you can run the server by running `npm start` this will automatically start the server on http://localhost:3000

## Software design Aspects taken into account :gears:

For the the most part this project follows the MVC architecture. This was due to that fact that for an application of this size it was far easier to give data to the views in order to display the UI and also so that you wouldn't need to run 2 different server instances to run this application (simpler for the user). MVC is benificial as it abstracts a lot of the logic for the database interactions. Which is great if you want to switch for something a lot more suited to production such as MongoDB.
I went for a very simple database called `lowdb` which is an npm package that installs when you run npm install.

That way it's a lot easier for you to get the application up and running without needing to start up any seperate instances.
A lot of the logic for interacting with lowdb rests in `lowdb.js` in the `utils` folder.

I also tried abstracting much of the verification of items by using schemas which are in the `utils/db/schemas` folder.

## What I would do to improve :bulb:

In order to improve this project I would most likely switch to a different database that allows for more concurrent actions and has better performance with larger datasets. 

Ideally for next steps to is I would dockerize this so that any docker-enabled environment would be able to run this fine.

Adding unit tests would also be a great idea for later on, however due to the time constraint that I currently have (Full courseload + 2 Executive Positions in Extracurriculars :sweat:), manual testing through Postman and UI was the way to verify correctness. In the future I'd love to use jest for unit testing and possible automate some REST testing using Insomnia.

Also if you have any feedback whatsoever feel free to email it to me at: allenluqin@gmail.com

I'm always looking to improve my work so anything helps :)