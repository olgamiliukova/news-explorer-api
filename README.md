# [Backend part of the "News Explorer" project](https://api.news-explorer.olgamiliukova.ml)

## Description
The repository is the [backend](https://api.news-explorer.olgamiliukova.ml) part of the ["News Explorer"](https://news-explorer.olgamiliukova.ml) for Yandex Praktikum Diploma project.

Use follow links:
- frontend [https://news-explorer.olgamiliukova.ml](https://news-explorer.olgamiliukova.ml).
- frontend(dev)[https://dev.news-explorer.olgamiliukova.ml](https://dev.news-explorer.olgamiliukova.ml)
- backend(dev) [https://dev.api.news-explorer.olgamiliukova.ml](https://dev.api.news-explorer.olgamiliukova.ml)

The latest release: 

[https://github.com/olgamiliukova/news-explorer-api/releases/latest](https://github.com/olgamiliukova/news-explorer-api/releases/latest)

## Install
```
git clone https://github.com/olgamiliukova/news-explorer-api.git
```
```
# npm
npm install -y
# or yarn
yarn install
```

## Configure .env
```
# cat
cat .env.dist > .env
# or cp
cp .env.dist .env
```

## Setup secret to .env
```
# npm
npm run secret
# or yarn
yarn run secret
```

## Setup seeds 
```
# npm
npm run seed
# or yarn
yarn run seed
```

## Development
```
# npm
npm run dev
# or yarn
yarn run dev
```

## Linting
```
# npm
npm run eslint
# or yarn
yarn run eslint
```

## Production
```
# npm
npm run start
# or yarn
yarn run start
```

## Authentication

### HTTP Methods
Signup user
```
POST /signup
```
Signin user
```
POST /signin
```

## API Resource "Articles"

#### Model Schema 
```
Article({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: User,
    required: true,
  }
})
```

### HTTP(S) Methods
Get article list
```
GET /articles
```
Get article by id
```
GET /articles/:id
```
Create new article
```
POST /articles
```
Update article by id
```
PUT /articles/:id
```
Delete article by id
```
DELETE /articles/:id
```

## API Resource "Users"

#### Model Schema
```
User({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 30,
  },
  salt: {
    type: String,
    required: true,
  }
})
```

### HTTP(S) Methods
Get user list
```
GET /users
```
Get current/authenticated user
```
GET /users/me
```
Get user by id
```
GET /users/:id
```
Create new user
```
POST /users
```
Update current/authenticated user
```
PATCH /users/me
```
Update user by id
```
PUT /users/:id
```
Delete user by id
```
DELETE /users/:id
```
