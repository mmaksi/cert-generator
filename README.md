# Certification Generator
Certification Generator is an app was created during my internship in focal X agency and it aims at verifying wether someone is/was an intern or an employee in focal X. Only a single admin is allowed to login to the dashboard to add or edit members. The API doesn't allow for multiple admins to sign up. I was responsible for building and securing the API using node.js and mongoDB database, while my teammate, [Safaa Alhadi](https://github.com/safaaalhadi) was responsible for building the UI.

# API Documentation
## Featuress
- Versioned API for easy scalability and maintenace in the long run.
- Stateless, secure REST API.
- Implements a secure MongoDB connection.
- Authentication system, allowing a single admin to sign up in the database.
- All responses are in JSON format.

## Members Endpoint Documentation
The base URL for our versioned API is: `https://focalx-certgenerator.herokuapp.com/v1`
- Get access to all of the members stored in the database by adding `/members` to the base URL as GET request [as follows](https://focalx-certgenerator.herokuapp.com/v1/members). If no members found, it returns an empty array with status code 200 OK.

- Get access to a specific member using the member's ID by adding `/members/memberId` to the `/members` endpoint  in a GET request [as follows](https://focalx-certgenerator.herokuapp.com/v1/members/member/memberId). If memberId is not found, it returns a JSON error message: `{ error: "member not found" }` with status code 404 NOT FOUND. Otherwise, it returns the requested member as a JSON object with status code 200 OK.

- Get access to a specific member using the member's first name and last name by adding `firstName` and `lastName` as query parameters to the `/members` endpoint in a GET request [as follows](https://focalx-certgenerator.herokuapp.com/v1/members/member?firstName=Mark&lastName=Maksi). If memberId is not found, it returns a JSON error message: `{ error: "member not found" }` with status code 404 NOT FOUND. Otherwise, it returns the requested member as a JSON object with status code 200 OK.

- Add a new intern or employee to the database by sending a POST request to the `/members` endpoint [as follows](https://focalx-certgenerator.herokuapp.com/v1/members/) where the body object has these keys: `generatedId`, `firstName`, `lastName`, `address`, `specification`, `supervisor`, `kpi`, `isEmployee`, `isIntern`, `hardSkills`, `softSkills`, `projects`, `duration`, `startDate`, `endDate`.
If any of the specified keys is missing, it returns a JSON error message: `{ error: "required data is missing" }` with status code 400 BAD REQUEST. Otherwise, it returns the requested member as a JSON object with status code 201 CREATED.

- Update a specific member information by sending a PUT to the `/members` endpoint [as follows](https://focalx-certgenerator.herokuapp.com/v1/members/) request where the body object has these keys: `memberId`, `firstName`, `lastName`, `address`, `specification`, `supervisor`, `kpi`, `isEmployee`, `isIntern`, `hardSkills`, `softSkills`, `projects`, `duration`, `startDate`, `endDate`.
If any of the specified keys is missing, it returns a JSON error message: `{ error: "required data is missing" }` with status code 400 BAD REQUEST. Otherwise, it returns the requested member as a JSON object with status code 201 CREATED.

## Authentication Endpoint Documentation
- Register a new admin in the database by sending a POST request to the `/auth` endpoint [as follows](https://focalx-certgenerator.herokuapp.com/v1/auth/register) where the body object has these keys: `username` and `password` with status code 400 BAD REQUEST. If any of these fields are missing, it returns a JSON error message: `{ error: "required fields are missing" }`. If multiple users tried to register, it returns a JSON error message: `{ error: "only one admin is allowed to register and it already exists" }` with status code 403 FORBIDDEN. Otherwise, it returns the registed admin as a JSON object with status code 201 CREATED.

- Sign in to the database with an already created account by sending a POST request to the `/auth` endpoint [as follows](https://focalx-certgenerator.herokuapp.com/v1/auth/signin) where the body object has these keys: `username` and `password` with status code 400 BAD REQUEST. If any of these fields are missing, it returns a JSON error message: `{ error: "required fields are missing" }`. If either the username or the password are incorrect, it returns a JSON error message: `{ error: "unauthorized" }` with status code 401 UNAUTHORIZED. If both the username and password are correct, it returns a JSON success message: `{ message: "authorized" }` with status code 200 OK.