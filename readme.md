# API for Hotel-Synergy

Hotel Synergy is an open source hotel & restaurant management system. It was built as a personal project however, keeping in mind the need for local bussiness, this software is open sourced under MIT license.

## Live Demo

Live demo for this web app can be found: <a href="LINK WILL BE ADDED WHEN DEPLOYED.">here</a>.

## Technology Used

Broadly, `MERN` stack is used. Front End for this software is built with React. Please see the <a href="https://www.github.com/hotel-synergy/frontend">frontend repository</a>. Backend is built with Express server on Node.js runtime and this repository is for the backend API.

## Getting Started

To get started using this software, clone both the backend and frontend repository of this web app using the following commands.

To clone backend:
`git clone https://www.github.com/hotel-synergy/backend`

To clone frontend:
`git clone https://www.github.com/hotel-synergy/frontend`

or you can use ssh or CLI as per your requirements.

## Make It Yours

Once you have cloned both the repository, you can now start you own local development environment or deploy it in production. Below are some instructions to do so as per your requirements.

## Local development

If you want to make changes to the existing features and/or modify the web app as per your requirement please feel free to do so. You can start the development server on both the frontend and backend repositories with the following command.

To start development server : `npm run dev`

Please make sure that you have created the required environment variables. You can see the `env.example` file on both the repositories to know what variables are used.

But if you want to make changes to the code with an intention to contribute to this repository, please read the <a href="/contributing.md">contribution guidelines</a> first. If you do not abide by the guidelines, your PR may not be merged.

## Production

If you want to deploy your version of this software to production, you can do so.

For frontend, you can use this command: `vite build` to build the app. If you want more detailed information on deploying frontend please read <a href="https://vitejs.dev/guide/build.html">this guide</a>.

For backend, it is nothing special than a typical nodejs application. If you still need further assistance, please feel free to explore <a href="https://www.codewithharry.com/blogpost/deploy-nodejs-app-on-ubuntu/">this</a>.
