# Telegeraph Messenger - Server Side

This Project is a Light-weight But Powerfull Back-end Messenger API that work with it's own Web-App.  
You Can find it's Open Source Web-App On Following Repository : [Telegraph-Client](https://github.com/kiarashatri/telegeraph-server).  
**caution : front-end of this project isn't completed yet , its will be complete and publish very soon .**

## Running Live Server Roadmap :

- Make sure you have installed Node.js

  ```bash
  Node -v
  ```

- Install dependencies :

  ```bash
  npm install
  ```

- instantiate .env file :

  ```bash
  cp .env.example .env
  ```

  **you can read more about Environment Variables requirements in document**

  - To run this project, at least this environment variables are require:  
    `SERVER_URL`

- Run Live Server :

  ```bash
  npm run serve:development
  ```

After following this step's , Your localhost live server Url shown in your Terminal/Command-line .
**Make sure you do not close Terminal during using Live server**

## Build Production files for Deploy Project Roadmap :

- Make sure you have installed Node.js

  ```bash
  Node -v
  ```

- Install dependencies :

  ```bash
  npm install
  ```

- instantiate .env file :

  ```bash
  cp .env.example .env
  ```

  **you can read more about Environment Variables requirements in document**

  - To run this project, at least this environment variables are require:  
    `SERVER_URL`

- Build Project :

  ```bash
  npm run build:production
  ```

After following this step's , A New folder created called (./dist) and all your Ready2deploy files inserted there so you can Upload that folder in the real Hosting or server to serve on Web .

## Docker

As soon as Project complete, Docker Image Will be Avaliable.

## Demo

As soon as Project complete, Demo will be upload on server.

## Features

- Login
- register
- verify JWT
- Web Socket
- Send/Receive messenge
- Tweet

## 🛠 Used echnologies :

- Requests :
  WebSocket.io, Axios

- Web-Socket :
  Websocket.io

## End Point's :

- /

  - /login  
     To login to an existing user

  - /register  
     To register a new User

  - /email-confirmation  
     To register a new User

  - /{:user}  
     to access main user page

    - /{:to}  
       Messenge to an other user

## Documentation

[Documentation](https://www.github.com/kiarashatri/#)

## Contributing

Pull requests are welcome!  
For cleaning changes , please open an issue first to discuss what you would like to change.

## Authors

- [@KiarashAtri](https://www.github.com/kiarashatri)
