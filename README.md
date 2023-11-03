# Whimsi-do

## Monorepo Application

This project is a comprehensive demonstration of my proficiency in React, Redux, and TypeScript. It is structured as a monorepo, comprising a frontend and a backend, each encapsulated in its own dedicated folder.

## Available Scripts

In the root directory of the project, you can run:

### `yarn start`

To install all dependencies in the project, including sub-projects, simply run `yarn setup` in the root directory. This command will traverse through the project structure and install the necessary dependencies listed in each `package.json` file.

You can also run `yarn install` in each of the projects separately.

## Project Dependencies

This project uses a variety of dependencies to enhance its functionality and streamline the development process:

- `react` and `react-dom`: These are the core libraries for building user interfaces with React.
- `@reduxjs/toolkit`: This is used for efficient state management in the application.
- `typescript`: This provides static type checking, which can help catch errors early in the development process.
- `@chakra-ui/react` and `@chakra-ui/icons`: These are used for building accessible and responsive UI components.
- `@emotion/react` and `@emotion/styled`: These are used for writing CSS styles with JavaScript, providing dynamic styling capabilities.
- `react-router-dom`: This is used for routing and navigation within the application.
- `react-hook-form`: This helps with efficient form handling in React.
- `styled-components`: This allows us to write actual CSS code to style our components.
- `localforage`: This provides a simple, localStorage-like API for managing offline storage.
- `@testing-library/react`, `@testing-library/jest-dom`, and `@testing-library/user-event`: These are used for testing the application, ensuring that it works as expected.

In addition to the frontend dependencies, the backend of this project also utilizes several key libraries:

- `express`: This is a fast, unopinionated, and flexible Node.js web application framework. It provides a robust set of features for web and mobile applications.
- `body-parser`: This is a Node.js body parsing middleware. It is responsible for parsing the incoming request bodies in a middleware before your handlers.
- `lowdb`: This is a small local JSON database powered by Lodash (supports Node, Electron, and the browser).
- `nanoid`: This is a tiny, secure, URL-friendly, unique string ID generator for JavaScript.
- `node-fetch`: This is a light-weight module that brings the Fetch API to Node.js, making HTTP requests simpler and easier.
- `express-jsdoc-swagger`: This library allows you to generate your API documentation in Swagger format using JSDoc comments.
- `nodemon`: This is a utility that monitors for any changes in your source and automatically restarts your server, making development faster and more efficient.
- `@babel/cli`, `@babel/core`, and `@babel/preset-env`: These are part of Babel, a JavaScript compiler that helps us use next generation JavaScript, today.

These dependencies ensure that the backend of the application is robust, efficient, and maintainable.

Each of these dependencies plays a crucial role in the project, contributing to its robustness and the overall quality of the code.

Enjoy exploring the project!