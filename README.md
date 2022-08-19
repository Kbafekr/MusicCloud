# MusicCloud

## Description

A fullstack pixel-perfect clone of SoundCloud using React, Redux, and Express. 
View a live demo [here:](https://soundcloudcloneaa.herokuapp.com){:target="_blank"}

## Features
* Create, edit, delete, and search for songs.
* Create, edit, delete, and search for playlists.

## Setup
  1. Clone this repository and ```npm install``` at root directory.
  2. Do the following in the backend directory:
        * Create a ```.env``` file based on the env.example
        * Run ```npx dotenv sequelize db:migrate```
        * Run ```npx dotenv sequelize db:seed:all```
  3. Run ```npm start``` in the root directory.
  4. Open http://localhost:3000 to view in browser.
  
## Technologies Used:

* CSS
* Express
* Node.js
* React
* Redux
* Sequelize
* SQLite
