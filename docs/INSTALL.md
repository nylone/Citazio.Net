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

    cd server
    npm install

Let's move to the database. In a MariaDB console run:

    create user 'citazionet'@localhost identified by 'password';
    create database 'citazionet';
    grant all privileges on 'citazionet'.* to 'citazionet_user'@localhost;
    flush privileges;

>*Make sure to use a secure password for your database user!*

We're now ready to configure our environment and run the project

## Configuration

