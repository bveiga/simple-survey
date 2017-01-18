# Simple Survey
This is a two-part web app to ask questions from users and record answers. The first part is an admin console that allows admins to create questions, and track responses. The second part is a website that asks questions from its users.

# Prerequisites
### NodeJS
Since this is a NodeJS application you're going to need to install NodeJS for it to run. The app was written and tested using version 0.10.46, but you may be able to run it using later versions as well.

### MySQL
Make sure you install MySQL on your server before starting. Additionally, if you already have MySQL installed and want the app to use a separate database, make sure you create a separate database as well.

# App Structure
The backend is simple - all the files to run the NodeJS server are inside "/server". 

For the frontend, we have a different setup. Personal scripts and styles are developed in "/dev/scripts" and "/dev/styles" respectively. Vendor scripts and stylesheets come from the "/node_modules" that is when the projects dependencies are installed. All of these get compiled into client.js, client.css, vendor.js, and vendor.css and put into their corresponding folders inside "/client"

# Building the Project
To build this project, first install all dependencies with the node package manager:
```
$ npm install
```

Next, you need to compile the stylesheets and scripts to make it production ready:
```
$ gulp build
```

Lastly start the node server using an environment variable for your database url, for example:
```
$ DATABASE_URL='mysql://username:password@servername:port/database_name' npm start
```

# Sample SQL
This project includes a sample.sql that you can execute in your MySQL database for testing. Simply run the following from your project's root folder:
```
$ mysql -u username -p -h database_name < sample.sql
```

Input your mysql password when prompter and you're to go!
