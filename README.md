# Classic Vehicle Rental Management Syste!

A Fmanagement system for high end car rental company built with Sequelize/Node.js/Express/MySQL/Handlebars/Bootstrap4/Firebase. This app is currently targeted at employees of a Classic Car rental company. It is essentially split into two sides. Customer management and vehicle management.

## Description
This application demonstrates a simple full stack application with a front end implemented with HTML/CSS and elements from the Bootsrap4 framework and the backend implemented with Node.js and Express. HTML templating is done with the help of Handlebars. We used Sequelize Object Relational Mapping to map the relational data from the database to the objects in the back end.

### Customer Management
You start by creating an account and logging in. Once there, you have the customer database which shows all the customers in the database (This uses the GET route in the apiRoutes for retrieving data).
From the customer database, you can choose to delete or update a specified customer by filling in the form. A customer can be created by using the nav bar under “Customer” by filling in the form.
When a customer is clicked, you are brought to that specific customer’s card which shows all the information for that customer.
Between all the options to create, read, update and delete customer data, the requirement for using the Sequelize ORM is fulfilled as well as being backed by a MySQL Database.


### Vehicle Management
Similar to the customer side, a vehicle can be created by filling in the form. All the vehicles will be shown as cards and can be brought to the specific vehicle’s card where all the information will be brought up.

The vehicle can also be update and deleted and so once again satisfies the Sequelize ORM requirement.


## Demo
The demo of the application can be found [here](https://warm-river-82196.herokuapp.com/home).

## Installation
To run the application locally, first clone this repository with the following command.

git clone https://github.com/GMCLi/Project-2
Next, install the application dependencies.

cd Project-2
npm install
Finally, run the node server locally.

### node server
Now, open the local application on port 3000 at the URL: http://localhost:3000/.

# Collaborators

* Gordon Li [GMCLi](https://github.com/GMCLi);
* Sasan Salimi [msasansalimi](https://github.com/msasansalimi);
* Paskwa Mutunga [pmutunga](https://github.com/pmutunga);