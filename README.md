# Yannickdjoa Personal Portfolio WebApp

Welcome to the repository for my personal portfolio web application, www.yannickdjoa.org. This project consists of two main components: the client interface, which showcases my portfolio, and the dashboard, which allows employees to easily make modifications and create new content.

## Table of Contents

- Overview

- Features

- Technologies Used

- Project Structure

- Getting Started

- Prerequisites

- Installation

- Running Locally

- Deployment

- Contributing

- License

- Project Links and Contact

- Author

- Roadmap

## Overview

This web application serves as my personal portfolio, presenting my projects, skills, and experiences. The dashboard is a user-friendly interface for employees to manage and update the content on the site.

## Features

#### Client Interface:

A responsive and visually appealing portfolio showcasing my work and skills.

#### Dashboard:

An admin panel for managing portfolio content, including user management, projects, experiences, services, and more.

#### Authentication:

Secure sign-in functionality using Firebase Authentication.

#### Database:

Firebase Firestore for storing and retrieving data. Firebase storage for storing all data such as images and files.

#### Continuous Integration/Continuous Deployment:

Automated deployment using GitHub CI/CD.

## Technologies Used

The Project is mainly build using Javascript language with some additional languages necessary for React app such as Html and CSS.

### Frontend

- Vite + React: Fast and modern development setup using Vite for building and bundling the React application.
- TailwindCSS: Utility-first CSS framework for designing responsive and modern UIs.
- Redux: State management for predictable state changes.
- html: basic structure of the webpage
- firebase hosting: live deployment tool

## Backend

- Node.js: JavaScript runtime for building the server.
- Express: Web framework for Node.js for building the middleware.
- Firebase: Firebase Authentication for user sign-in and Firestore for the database.

## Deployment

- Firebase Hosting: Hosting service for deploying web applications.
- GitHub Actions: CI/CD pipelines for automated deployment.

## Project Structure

root
│ README.md
│ package.json
│ vite.config.js
│ tailwind.config.js  
│ firebase.json
│ main.jsx
│ App.jsx
│ index.css
│ firebase.js
│ .firebaserc
│ index.html
│ .gitignore
│
├───client
│ ├───public
│ └───src
│ ├───assets
│ ├───components
│ ├───pages
│ ├───redux
│ ├───sections
│ └───utils
│
├───server
│ ├───controllers
│ ├───routes
│ ├───utils
│ ├───package.json
│ ├───firebase.json
│ ├───index.js
│ └───firebaseConfig.js
│
└───.github
└───workflows

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm (v6 or later)
- Firebase CLI (for deployment)

### Installation

1. Clone the repository:

- git clone https://github.com/Yannickdjoa/yannickdjoa.git
- cd yannickdjoa

2. Install dependencies:

- For the client
  - cd client
  - npm install

- For the server
  - cd ../server
  - npm install

3. Setup Firebase:

- Create a Firebase project and configure Firebase Authentication and Firestore.
- Update the .env file with your Firebase configuration details.

### Running Locally

1. Start the client:
   - cd client
   - npm run dev

2. Start the server:
   - cd server
   - npm run dev

3. Open the application:
   - Navigate to http://localhost:3000 in your browser.

## Deployment

### Firebase Hosting

1. Build the client:

- cd client
- push the code to github using git
- The project is configured with GitHub Actions for CI/CD. Ensure your GitHub repository is set up with the appropriate Firebase secrets.

2. Deploy Backend to Firebase:
   - cd server
   - firebase deploy

## Contributing

Contributions are welcome! Please fork this repository and submit pull requests to suggest improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Project Links and Contact

- Repository: https://github.com/Yannickdjoa/yannickdjoa
- Live webpage: https://www.yannickdjoa.org
- For any inquiries or feedback, please reach out to team via the contact form in the webpage www.yannickdjoa.org

## Author

- Github: https://github.com/Yannickdjoa
- Webpage: https://www.yannickdjoa.org
- Tweeter: https://twitter.com/DjoaYannick
- LinkedIn: https://www.linkedin.com/in/yannick-djoa-4319a317/

## Roadmap

- Wave 1: current developed features (see features)
- Wave 2: additional features
  - improve the visual and ui
  - improve the performance
  - any other features suggestions are welcome

Thank you for visiting my personal portfolio web application!
