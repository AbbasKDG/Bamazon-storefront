# Bamazon-storefront
*Node.js &amp; MySQL Store*

Attempting to create an interactive storefront interfaced through **node** using **MySQL** to manage a "bamazon" database. 
The first objective is to create a product table (of unique id, name of product, department name, price for customer and stock quantity in store for each product) and populate it. 



``` javascript
              require('./bamazon');
              require('inquirer');
```
Inquirer is the primary npm package being used here. Logging *products* table from the bamazon database

``` javascript
              Inquirer.prompt(){...
```
method used to gather user inputs for a generic sale of goods request via SELECT. 
To launch
```javascript
              node bamazon.js
```


