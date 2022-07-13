# Tasty TV Full-Stack Web App

## Elevator Pitch Introduction
Tasty TV is a social media review platform for film fans (Like Tripadvisor for movies) where users can manage their watch list and write review content about the movies they choose. The reviews are shared with other users who can add those movies to their watch list and write their own reviews. Users can comment on reviews, contributing to the conversation.

## Try It Out
Tasty TV is deployed and available to sign-up and start creating movie review content [here.](https://tasty-tv-app.herokuapp.com/)

## Why Make Tasty TV?
Tasty TV started out as my front-end project for my postgraduate work that I decided to build on, after graduating from university. I wanted to make it a full-stack personal project where I could apply everything I learned while studying, and further develop my knowledge and skills in software development.

## Technologies Used
- Languages: JavaScript, HTML5, CSS
- Libraries: React, Mongoose, CORs, Passport, Dotenv, Path, Http-errors, Morgan, Cookie-Parser, JWT
- Environment: Node.js
- Framework: Express.js
- Database: MongoDB

## Initial User Stories and Wire Frame Designs
As part of the initial design stage to determine requirements, I created user stories in order to understand how users may want to interact with the application. I created wireframes in order to ascertain how users could navigate the application UI. The wireframes also helped determine parent and child React components.  
  
  Both user stories and wireframes are available to view [here.](https://miro.com/app/board/o9J_lxclt7o=/?share_link_id=442093825018)

## Client Side
The client-side was designed as a React SPA, utilizing React components and function-based states to update the virtual DOM. 

## Server Side
The server was created in a Node.js environment with an express framework. Multiple routes and models were created to enable the functionality of the application. Fetch was used as the primary way of requesting data between the client and the server.

## How is Tasty TV Used
1. Anyone can view and "spin" for more random recommended movie cards and synopsis when visiting Tasty TV
2. Users can create an account by signing up with a unique username and password of their choosing, in accordance with the minimum character requirements
3. Users will then be able to add recommended movies to their watch list
4. Users can create and post review content of their added movies for other users to see
5. Users can comment on other user reviews and contribute to the conversation
6. Users can add movies from other user's reviews to their own watchlist
7. Tasty TV does not enable movies to be played through the application as it is purely to demonstrate the usability of managing lists and contributing to posts from other users
8. Tasty TV has been built to accommodate multiple device screen sizes and resolutions

## Authentication and Authorisation
Passport and JSON web tokens are used to authorize user access to their content. When a user registers, their username and password are stored in the database (passwords are encrypted with SALT and HASH). When a user attempts to sign in the server authenticates the user, checking if the username exists within the database and rejected if the user does not exist. Once authenticated the server checks the password, providing a JSON web token in a cookie if the user credentials are authorized. 

## Problems in Development and Deployment
A couple of issues did become apparent during both development and deployment which I solved. Two major problems I faced were:  
  1. I quickly learned that a client cannot make requests to a server from a different domain unless authorized to do so through CORs. Having never been presented with this issue during my university study, it took longer than anticipated to study and solve the problem to be able to make client requests to the server.
  2. The biggest issue was not being able to share cookies between the server and the client, which only became apparent at deployment, not development. Cookies are needed to store the JSON web token for users to be able to interact with the application. Originally, both the client side and server were developed as two completely separate projects with their own repositories. You will now see in this repository that both the client and server are now in the same place. Given the time constraint I had for this project, the only solution was to combine both the client and server into the same repository, which technically meant that the client and server were running in the same domain. It was good to study articles relating to this problem, in particular [Cookies and the Public Suffix List,](https://devcenter.heroku.com/articles/cookies-and-herokuapp-com) which highlighted the limitations of sharing cookies between free hosting sites, such as Heroku (where Tasty TV is now hosted) and Netlify. Although the solution enabled the application to deploy and function as designed, the directory organization suffered extensively; this repository became bloated with both the client and server code in the same place. It is not possible to run both the client and server locally while they are within the same directory at this stage. I will be working to upload both the client and server in separate repositories once again which will enable the application to be run locally for any future development.

## What I Learned
Overall, I learned a lot about the limitations of requesting and sharing information between two separate domains, including cookies. I discovered that a development and deployment environment can behave entirely differently; for future projects, I plan to factor in more testing of deployment in order to confirm the application works as intended when published. 

## What's Next for Tasty TV?
1. I will produce separate repositories for both the client and server side to enable others to access the project as a local development environment.
2. I will continue to refactor the code so that it is cleaner and more maintainable
3. Time pending, it would be great to study and add other features, such as "forgot my password", UI and dark and white colour modes
4. I would like to continue to study Passport and JSON web tokens in order to further understand the full potential of these libraries

## And Finally
Tasty TV has been a great project to build my knowledge and skills as a full-stack developer. I am really proud to have built a client and server that interacts with each other to enable users to create content. I look forward to applying these skills to future projects and development.

 :)