# MusicCloud

## Description

A fullstack clone of SoundCloud using React, Redux, and Express.
View a live demo [here:](https://soundcloudcloneaa.herokuapp.com)

## Features
* Create, edit, delete, and listen to songs.
* Create, edit, delete, and listen to albums.

## Setup
  1. Clone this repository and ```npm install``` at root directory.
  2. Do the following in the backend directory:
        * Create a ```.env``` file based on the env.example
        * Run ```npx dotenv sequelize db:migrate```
        * Run ```npx dotenv sequelize db:seed:all```
        * Run ```npm start``` in the backend directory.
  3. Run ```npm start``` in frontend directory.
  4. Open http://localhost:3000 to view in browser.

## Technologies Used:

* CSS
* Express
* Node.js
* React
* Redux
* Sequelize
* SQLite

### Sign Up Page

The Sign up page that includes a demo login.

![image](https://github.com/Kbafekr/MusicCloud/blob/9aa87373473019d17a24356e0b8c19591a0f4c14/Read%20Me%20Images/SignUpPage.png)

### Home Page

The home page after signing in.

![image](https://github.com/Kbafekr/MusicCloud/blob/9aa87373473019d17a24356e0b8c19591a0f4c14/Read%20Me%20Images/HomePage.png)

### Library Page

Your personal library which includes links to albums and songs that you own.

![image](https://github.com/Kbafekr/MusicCloud/blob/9aa87373473019d17a24356e0b8c19591a0f4c14/Read%20Me%20Images/LibraryPage.png)


### Songs Page

View all songs on Music Cloud!

![image](https://github.com/Kbafekr/MusicCloud/blob/9aa87373473019d17a24356e0b8c19591a0f4c14/Read%20Me%20Images/SongsPage.png)

### Albums Page

View all songs on Music Cloud!

![image](https://github.com/Kbafekr/MusicCloud/blob/9aa87373473019d17a24356e0b8c19591a0f4c14/Read%20Me%20Images/AlbumsPage.png)

### SongDetails Page

View details of a song, including artist and album details. Also includes the option to edit or delete a song.


![image](https://github.com/Kbafekr/MusicCloud/blob/9aa87373473019d17a24356e0b8c19591a0f4c14/Read%20Me%20Images/SongDetailsPage.png)


### AlbumDetails Page

View details of an album, including artist and song details. Also includes the option to edit or delete an album.

![image](https://github.com/Kbafekr/MusicCloud/blob/9aa87373473019d17a24356e0b8c19591a0f4c14/Read%20Me%20Images/AlbumDetailsPage.png)





#### Future Features:

* Playlists
* Comments
