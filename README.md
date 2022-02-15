# Memoravel.vn

![Demo](https://drive.google.com/uc?id=1ryRYMoLw1Bl9osvIIqBVUeuUddC68-mB)

Memoravel.vn is an e-commerce website promoting Vietnamese traditional craft villages. 

## Features

- View products, add to cart, order.
- Search, filter products.
- Blog.
- Admin CRUD operations.
- Integrate Google Analytics.
- Integrate Giaohangtietkiem (GHTK) API for calculating shipping fees and creating orders.

## Demo

- Website: https://memoravel.vn
    > Note: The link above shows the version using the production environment of Giaohangtietkiem (GHTK). Therefore, every order created is real!

- Admin: [Demo]([https://link](https://drive.google.com/file/d/1TXZDm4LDOc7iJlEB9TcmALdyHWgNay2N/view?usp=sharing))

- Order: [Demo]([https://link](https://drive.google.com/uc?id=1jCg3I5UQIAbTYQfaelTzMM8yVh0k9Q0G))

## Run Locally 

### Run client

1. Install Dependencies

```sh
  cd client
  npm install
```

2. Run development server

```sh
  npm run dev
```

### Run server

1. Install Dependencies

```sh
  cd server
  npm install
```

2. Config env

- Create new file .env in /server.
- Copy content from .env.example file to .env file and change value.
- Sample config:

```sh
DATABASE_URL = mysql://username-database:password-database@localhost:3306/database-name
ADMIN_ACCOUNT=memoravel
ADMIN_PASSWORD=12345678

PORT=5000

GHTK_API_URL=https://services.giaohangtietkiem.vn
GHTK_API_TOKEN=api_key
```

3. Run server

```sh
  npm start
```

## API Reference

Memoravel API Design: [Link](https://docs.google.com/spreadsheets/d/1H689YuIo5pV0Z2OdZPZfwqYtnwct7eaopzjvL__8FSw/edit#gid=1185744960)