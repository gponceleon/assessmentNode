The environment file should look like the following example:

ROUTE=/assessment
DOCS=/assessment/docs
ENVIRONMENT=PT
HOST=localhost
PORT=80

LOG_LEVEL=debug

SECRET=test

CLIENT_URL=http://www.mocky.io/v2/5808862710000087232b75ac
POLICIES_URL=http://www.mocky.io/v2/580891a4100000e8242b75c5

## To run

And finally you are able to run the project by executing this command:

```
$> npm start
```

## To run in Docker 
  docker-compose up -d
  make up (need make for this)
  
## HTTP exposed endpoints

This project exposes 6 endpoints, and those are listed below.

### User endpoints (sign in, sign up and sign out)

```
method: POST
url: "http://localhost:YOUR_PORT/login"
body: {
  username: 'username',
  password: 'password'
}
```

```
method: POST
url: "http://localhost:YOUR_PORT/logout"
required headers: {
	Authorization: 'Bearer YOUR_TOKEN'
}
```
### Clients endpoints

```
method: GET
url: "http://localhost:YOUR_PORT/clients/USER_ID"
required headers: {
	Authorization: 'Bearer YOUR_TOKEN'
}

```

```
method: GET
url: "http://localhost:YOUR_PORT/clients/?USERNAME"
required headers: {
	Authorization: 'Bearer YOUR_TOKEN'
}
```

### Policies endpoints

```
method: GET
url: "http://localhost:YOUR_PORT/policies/USER_ID"
required headers: {
	Authorization: 'Bearer YOUR_TOKEN'
}

```

```
method: GET
url: "http://localhost:YOUR_PORT/policies/?USERNAME"
required headers: {
	Authorization: 'Bearer YOUR_TOKEN'
}
```

