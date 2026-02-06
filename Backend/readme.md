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
