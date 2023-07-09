# InvenTrick Service Backend

## Overview

This is the README file for the backend of the InvenTrick application. InvenTrick is a web application built using Node.js, MongoDB, and JWT for authentication. The backend utilizes the Express.js framework and is hosted on Mongo Atlas cloud platform.

## Technologies Used

- Node.js
- MongoDB
- JWT (JSON Web Tokens)
- Express.js
- Mongo Atlas

## Features

The backend of InvenTrick provides several features:

1. **Authentication**: The application includes an authentication system using JWT. Users can sign up, log in, and receive a token to authenticate their requests to protected routes.

2. **Roles Authorization**: The backend implements a role-based authorization system. Different roles such as "admin" and "user" can be assigned to users, allowing or restricting access to certain routes and functionalities based on their role.

3. **Suspend Account**: The backend includes functionality to suspend user accounts. Administrators can suspend or reactivate user accounts, restricting or enabling their access to the application.

4. **Etc**: Additional features and functionalities can be added here as needed.

## Setup

To set up the backend of the InvenTrick application, follow these steps:

1. Install Node.js and MongoDB on your machine if you haven't already.

2. Clone the repository from [GitHub Repository URL](https://github.com/your-repository-url).

3. Navigate to the backend directory: `cd invenTrick-backend`.

4. Install the required dependencies: `npm install`.

5. Create a `.env` file in the root directory and configure the following environment variables:

   ```
   DB_URI_LOCAL=<Your MongoCompas URI>
   DB_URI_ATLAS=<Your MongoDB Atlas connection URI>
   PORT=3000
   TZ=<Your TimeZone>
   TOKEN_KEY=<Your JWT secret key>
   ADMIN_PASS=<Your create admin pass>
   ```

6. Run the application: `npm start`.

7. The backend server should now be running on `http://localhost:3000`.

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/signup`: Sign up a new user.
- `POST /api/login`: Log in an existing user.
- `GET /api/user/profile`: Get the profile information of the logged-in user.
- `POST /api/user/suspend/:userId`: Suspend a user account (admin-only route).
- `POST /api/user/reactivate/:userId`: Reactivate a suspended user account (admin-only route).

Please refer to the API documentation or codebase for more details on request/response formats and authentication requirements.

## Contributors

- [Akhmad Fauzi](https://github.com/A-fauzi)

## License

This project is licensed under the [MIT License](LICENSE).

---

This README provides an overview of the backend of the InvenTrick application. For more detailed information, refer to the codebase and documentation.
