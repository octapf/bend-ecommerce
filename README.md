# Proyect for testing username creation

## Endpoints

- GET - /
- POST - /signup - signup
- POST - /signin - signin
- GET - /users - @protected/getUsers
- GET - /users/:id - @protected/getUserById

## Incoming features

### Models

#### models.user

- add name<object> {firstName<string>, lastName<string>} field
- add username<string> field
- add email<string> field
- add password<string> field
- add birthdate<date> field
- add phone<array> field
- add address<array> field
- add timestamps<option> field 🆗

### Endpoints

#### GET

- add getAllUsers endpoint 🆗
- add getUserById endpoint 🆗

#### POST

- add signin endpoint 🆗
- add signup endpoint 🆗
- add validateUsername endpoint 🆗
- add validateUserEmail endpoint 🆗

#### DELETE

- add deleteUserById endpoint 🆗

#### PUT

- add updateUserFirstName endpoint 🆗
- add updateUserLastName endpoint 🆗
- add updateUserEmail endpoint 🆗
- add updateUserPassword endpoint 🆗
- add updateUserUsername endpoint 🆗

### Middlewares

- add generate userName Middleware 🆗
- add validate userEmail Middleware 🆗
- add JWT middleware 🆗
- add expiration to JWT
- add refresh JWT

### Validation

- add RegExs Enum
- Error messages Enum
- Success messages Enum

### Documentation

- integrate swagger
- document all code

### Functionalities

- DTO Generator function for request bodies
- add Seeders-remove/add script
