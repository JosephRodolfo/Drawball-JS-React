# Draw and Explore, a Collaborative Drawing Game. 

This is a collaborative pixel art drawing game using a shared canvas (an HTML Canvas), but instead of placing pixels with the mouse, players move a pixel around with the WASD keys or tap/click the direction of the screen to move. The game board is composed of 100x100 pixel chunks stitched together into a 100,00 x 100,000 chunk map that players can access by moving beyond the edge of the map. It's built with Javascript, CSS, and HTML, using React and SCSS. This front end interacts with a NodeJS/Express backend I created here that writes to a MongoDB database using Mongoose: https://github.com/JosephRodolfo/Drawball-MongoDB-

## Accesssing the Game:

Sign up here:

https://josephrodolfo.github.io/Drawball-JS-React/

## Features

1. Post to an external API and show that it has saved/persisted

The game communicates with the API I created https://github.com/JosephRodolfo/Drawball-MongoDB-. The pixels are saved in a MongoDB database and each chunk is retrieved whenever accessed, so they persist after leaving that part of the map or logging off and signing back on. 

2. Develop your project using a common JavaScript framework such as React, Angular, Vue, etc.

The front end of this project uses React. 

3. Visualize data in a graph, chart, or other visual representation of data

The DataDisplay component displays information about the user's current position, current chunk position, and ink level and updates all three in real time. Position information displays "LOADING" text while the game is fetching pixels for the next loaded chunk. 
