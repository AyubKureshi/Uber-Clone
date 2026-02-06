## Users Register Endpoint

### Endpoint

- **URL:** `/users/register`
- **Method:** `POST`

### Description

Registers a new user. Validates input, hashes the password, creates the user record, and returns the created user object plus an auth token.

### Request Body

Content-Type: `application/json`

Required JSON body fields:

- `email` (string) — must be a valid email address.
- `fullName` (object)
  - `firstName` (string) — required, minimum 3 characters.
  - `lastName` (string) — optional.
- `password` (string) — required, minimum 8 characters.

Example:

```json
{
  "email": "jane.doe@example.com",
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "password": "supersecurepassword"
}
```

### Validation & Errors

- If validation fails (missing/invalid fields), the endpoint responds with `400 Bad Request` and a JSON body detailing the validation errors.

Example error response:

```json
HTTP/1.1 400 Bad Request
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "First name mnust be atleat 3 character long", "param": "fullName.firstName", "location": "body" }
  ]
}
```

### Success Response

- **Status:** `201 Created`
- **Body:** JSON containing the created `user` object and an authentication `token`.

Example success response:

```json
HTTP/1.1 201 Created
{
  "user": {
    "_id": "<userId>",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com"
  },
  "token": "<jwt-token>"
}
```

### Sample curl

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"jane.doe@example.com","fullName":{"firstName":"Jane","lastName":"Doe"},"password":"supersecurepassword"}'
```

### Notes

- Passwords are hashed before storing.
- Adjust the host/port in the sample curl to match your server configuration.

---

## Users Login Endpoint

### Endpoint

- **URL:** `/users/login`
- **Method:** `POST`

### Description

Authenticates an existing user with email and password. Validates credentials and returns the user object plus an authentication token if successful.

### Request Body

Content-Type: `application/json`

Required JSON body fields:

- `email` (string) — must be a valid email address.
- `password` (string) — required, minimum 8 characters.

Example:

```json
{
  "email": "jane.doe@example.com",
  "password": "supersecurepassword"
}
```

### Validation & Errors

#### 400 Bad Request

If validation fails (missing/invalid fields), returns `400 Bad Request` with validation errors:

Example error response:

```json
HTTP/1.1 400 Bad Request
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "Password must be atleast 8 character long", "param": "password", "location": "body" }
  ]
}
```

#### 401 Unauthorized

If user is not found or password does not match, returns `401 Unauthorized`:

Example error response:

```json
HTTP/1.1 401 Unauthorized
{
  "message": "Invalid email or password"
}
```

### Success Response

- **Status:** `201 Created`
- **Body:** JSON containing the authenticated `user` object and an authentication `token`.

Example success response:

```json
HTTP/1.1 201 Created
{
  "user": {
    "_id": "<userId>",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com"
  },
  "token": "<jwt-token>"
}
```

### Sample curl

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane.doe@example.com","password":"supersecurepassword"}'
```

### Notes

- The returned token should be included in subsequent requests for authentication.
- The login endpoint compares passwords securely using hashing comparison.
- Adjust the host/port in the sample curl to match your server configuration.

---

## Users Profile Endpoint

### Endpoint

- **URL:** `/users/profile`
- **Method:** `GET`

### Description

Retrieves the authenticated user's profile information. Requires a valid authentication token.

### Authentication

This endpoint requires authentication. Include the auth token in the request header:

```
Authorization: Bearer <token>
```

Or as a cookie:

```
Cookie: token=<token>
```

### Request

No request body required.

### Error Responses

#### 401 Unauthorized

If no valid token is provided or token has expired:

```json
HTTP/1.1 401 Unauthorized
{
  "message": "Unauthorized"
}
```

### Success Response

- **Status:** `200 OK`
- **Body:** JSON containing the authenticated user's profile data.

Example success response:

```json
HTTP/1.1 200 OK
{
  "_id": "<userId>",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com"
}
```

### Sample curl

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <token>"
```

---

## Users Logout Endpoint

### Endpoint

- **URL:** `/users/logout`
- **Method:** `GET`

### Description

Logs out the authenticated user by clearing the session token and blacklisting it. Requires a valid authentication token.

### Authentication

This endpoint requires authentication. Include the auth token in the request header:

```
Authorization: Bearer <token>
```

Or as a cookie:

```
Cookie: token=<token>
```

### Request

No request body required.

### Error Responses

#### 401 Unauthorized

If no valid token is provided or token has expired:

```json
HTTP/1.1 401 Unauthorized
{
  "message": "Unauthorized"
}
```

### Success Response

- **Status:** `200 OK`
- **Body:** JSON confirmation message.

Example success response:

```json
HTTP/1.1 200 OK
{
  "message": "Logged out"
}
```

### Sample curl

```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <token>"
```

### Notes

- The token is added to a blacklist to prevent reuse after logout.
- The token cookie is cleared from the client.
- The user will need to login again to access protected endpoints.
- Adjust the host/port in the sample curl to match your server configuration.

---

## Captains Register Endpoint

### Endpoint

- **URL:** `/captains/register`
- **Method:** `POST`

### Description

Registers a new captain with vehicle information. Validates input, hashes the password, creates the captain record with vehicle details, and returns the created captain object plus an auth token.

### Request Body

Content-Type: `application/json`

Required JSON body fields:

- `email` (string) — must be a valid email address.
- `fullName` (object)
  - `firstName` (string) — required, minimum 3 characters.
  - `lastName` (string) — optional.
- `password` (string) — required, minimum 8 characters.
- `vehicle` (object)
  - `color` (string) — required, minimum 3 characters.
  - `plate` (string) — required, minimum 10 characters.
  - `capacity` (number) — required, minimum value 1.
  - `vehicleType` (string) — required, must be one of: `'bike'`, `'car'`, `'auto'`.

Example:

```json
{
  "email": "captain.john@example.com",
  "fullName": {
    "firstName": "John",
    "lastName": "Driver"
  },
  "password": "securepassword123",
  "vehicle": {
    "color": "black",
    "plate": "DL012AB3456",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Validation & Errors

#### 400 Bad Request

If validation fails (missing/invalid fields):

Example error response:

```json
HTTP/1.1 400 Bad Request
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "First name mnust be atleat 3 character long", "param": "fullName.firstName", "location": "body" },
    { "msg": "Invalid vehicle type", "param": "vehicle.vehicleType", "location": "body" }
  ]
}
```

#### 400 Duplicate Email

If a captain with the same email already exists:

```json
HTTP/1.1 400 Bad Request
{
  "message": "Captain already exist"
}
```

### Success Response

- **Status:** `201 Created`
- **Body:** JSON containing the created `captain` object and an authentication `token`.

Example success response:

```json
HTTP/1.1 201 Created
{
  "captain": {
    "_id": "<captainId>",
    "firstName": "John",
    "lastName": "Driver",
    "email": "captain.john@example.com",
    "vehicle": {
      "color": "black",
      "plate": "DL012AB3456",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "<jwt-token>"
}
```

### Sample curl

```bash
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{"email":"captain.john@example.com","fullName":{"firstName":"John","lastName":"Driver"},"password":"securepassword123","vehicle":{"color":"black","plate":"DL012AB3456","capacity":4,"vehicleType":"car"}}'
```

### Notes

- Passwords are hashed before storing.
- Vehicle type must be exactly one of: `bike`, `car`, or `auto`.
- Email must be unique; duplicate registrations will be rejected.
- Adjust the host/port in the sample curl to match your server configuration.
