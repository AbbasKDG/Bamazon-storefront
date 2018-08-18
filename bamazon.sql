DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
item_id INT(10) auto_increment primary key, 
product_name VARCHAR (20),
department_name VARCHAR(20),
price DECIMAL(10,2) ,
stock_quantity DECIMAL(10,2)
);

INSERT into products (product_name,department_name,price,stock_quantity)
VALUES ("Bud Lights", "Drinks", 3.50, 2433),("Marlboro Lights", "Tobacco Products",12.99,45),("Fire Extinguisher","Building Supplies",47,52),("Mountain Dew","Drinks",1.75,1300),("Nico Patch","Tobacco Products",15,6455),("Air Jordans","Shoes",140,29),("Rockport kicks","Shoes",40,4),("Cleaning Agent","Building Supplies",32,250),("Lays","Food",0.99,3000),("Doritos","Food",2.20,76); 


create table departments(
department_id INT(10) auto_increment primary key,
department_name VARCHAR(20),
over_head_costs decimal(10,2)
);