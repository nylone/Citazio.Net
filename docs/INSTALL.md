# ![logo](/frontend/public/favicon.ico) Citazio.Net

## Prerequisites

In order to setup and run this project you will need:

- **Node** (this guide was tested using node v20.3.1)
- **npm** (this guide was tested using npm 9.6.7)
- **MariaDB** (this guide was tested using MariaDB Ver 15.1)
- **optionally** a reverse proxy (this guide was tested using Caddy v2.6.4)

## Installation

You can start by cloning this repository.

    git clone https://github.com/nylone/citazio.net
    cd citazio.net

Then start building the frontend

    cd frontend
    npm install
    npm run build

Next start building the backend server

    cd web-node
    npm install

Let's move to the database. In a MariaDB console run:

    create user 'citazionet'@localhost identified by 'password';
    create database 'citazionet';
    grant all privileges on 'citazionet'.* to 'citazionet_user'@localhost;
    flush privileges;

>**Make sure to use a secure password for your database user!**

We're now ready to configure our environment and run the project

## Configuration

Let's start by creating a gitignored copy of the default config file. From the root of the project run the following command:

    cp web-node/config/default.toml web-node/config/local.toml

You can now freely edit the *local.toml* config file. Remember that removing a field from the newly created file will import the default config from *default.toml*. It is advisable to only edit *local.toml* as it won't be affected by git.

> Please note that most of the default configs are set for a dev environment. For example: make sure to pay attention to the csp field!

Once you've properly configured your *local.toml* file, you can move on to setting up the database. From the root of the project run the following commands:

    cd web-node
    npm run setup

If your application is set to run with tokens enabled (*requireTokens = true*), you can run:

    npm run tokens <#tokens>

to add a number of tokens equal to #tokens to the database. All added tokenns are then logged to the console output.

That's it! you can now run the server with:

    npm run start

Or you can create a systemd unit and automate the service. In case you wish to do that, run the node app with:

    node server.js

inside the *web-node* directory.

## In case of doubts

Don't hesitate to open an issue if you are having trouble with the setup process!