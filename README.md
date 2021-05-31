# Sport App
## _This project is built using_
> Node.js, Express.js, MongoDB.

> AWS s3 bucket, Socket.io.

> React.js, React-Bootstrap, socket.io-client.

> ECMAScript-ES6, Babel transpiler.

## Technical Functionality

- Server-side rendering (SSR)
- [Context API](https://reactjs.org/docs/context.html) to handle global state managment.
- All the user request (Frontend/Backend) will be handle by Express.js only.
- JWT authentication: User's request will be authenticated by JWT.
- Event's image will be stored on AWS s3 bucket.
- Notification for Event registration will be served by Socket.io.
- Mobile friendly UI.

## Features

- User can login/register themselves on https://sport-app-one.herokuapp.com to use app.
- User can create or participate in Event
- To create Event Provide info i.e. Image, Date, price, name etc
- User can participate in existing even
- Owner of the Event will be notified for new participation request using Socket.io
- Owner has dashboard to see every participation so far 

## Local Installation

App requires [Node.js](https://nodejs.org/), [NPM](https://www.npmjs.com/) modules .

Install the dependencies and devDependencies and run below commands.

```sh
cd sport-app-express-ui
npm i
npm run start-client
```
Client will run on http://localhost:5500

```sh
npm run start-dev
```
Express app will run on http://localhost:8000


## You can look at below URL to explore the app in production.

```sh
https://sport-app-one.herokuapp.com
```

**Free Software, Hell Yeah!**
