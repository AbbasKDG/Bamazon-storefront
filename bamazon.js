/* PROGRAM LOGIC
Choose Customer or Warehouse
If Warehouse print "Portal under construction"
If Customer Input Name
Then Show: MENU
     Choice of Inventory or   Show cart => Confirm sale 
     Wait for selection
     Ask Quantity
     If selected check availability
        if unavailable say so and return to menu 
        if available say so ask if a)add to cart b)return to menu

*/

var MYSQL = require("mysql");
var INQUIRER = require("inquirer");

var info = [];

var connection = MYSQL.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bamazon_db"
});
connection.connect();

function checkOut(results) {
  //Print the Bill
  //Print out all items and prices and total prices
  console.log("Check Out\n" + results[0].shopper_name);
}

function shoppingCart() {
  console.log(
    "\nWelcome to your Shopping Cart\n=============================\n"
  );
  connection.query("SELECT * FROM `shopper`", function(error, results) {
    //console.log(results);
    for (var i = 0; i < results.length; i++) {
      console.log(
        `Name:${results[i].shopper_name} || Product:${
          results[i].product_name
        } || Count:${results[i].purchase_quantity}`
      );
    }
    /////Checkout - Shop - Exit
    INQUIRER.prompt([
      {
        message: "What services do you require",
        type: "list",
        name: "cont",
        choices: ["Checkout", "Shop", "Exit"]
      }
    ]).then(answers => {
      if (answers.cont === "Checkout") checkOut(results);
      else if (answers.cont === "Shop") Cconsole();
      else if (answers.cont === "Exit") Exit();
    });
  });
}
/////////////////////////////////////////////////////////////////////////////
function Exit() {
  console.log("See you soon!");
  // // process.exit();
}
////////////////////////////////////////////////////////////////////////
function addToShoppingList(results, pick, pickNum) {
  INQUIRER.prompt([
    {
      message: "What services do you require",
      type: "list",
      name: "cont",
      choices: ["Add to cart", "Menu", "Exit"]
    }
  ]).then(answers => {
    if (answers.cont === "Add to cart") {
      var addcartquery =
        'INSERT into shopper (shopper_name,product_name,purchase_quantity)  VALUES ("User","' +
        pick +
        '",' +
        pickNum +
        ")";
      //console.log(addcartquery);
      connection.query(
        addcartquery,
        //Change product quantity in products table
        function(error, insert) {
          // console.log(`${insert}`);
          shoppingCart();
        }
      );
    }

    //shoppingCart();
    else if (answers.cont === "Menu") {
      Cmenu();
    } else if (answers.cont === "Exit");
    Exit();
  });
}
// INQUIRER.prompt([
//   {
//     message: "Choose",
//     name: "Continue",
//     type: "list",
//     choices: ["Add to cart", "Menu", "Exit"]
//   }
// ]).then([
//   answers => {
//     console.log(answers.Continue);
//     if (answers.Continue === "Add to cart")
//       //connection.query('INSERT  INTO `product`')
//       shoppingCart();
//     if (answers.Continue === "Menu") Cconsole();
//     if (answers.Continue === "Exit") Exit();
//   }
// ]);
//////////////////////////////////////////////////////////
function checkOrder(pick, pickNum) {
  // console.log(pick);

  connection.query(
    'SELECT * FROM `products` WHERE `product_name`="' + pick + '";',
    function(error, results) {
      if (error) throw error;

      /// WORKING ON THIS
      //console.log(results);

      if (parseInt(results[0].stock_quantity) >= pickNum) {
        console.log("\nStock available\n===============");
        console.log(`Price: ${results[0].price}`);
        console.log(`x ${pickNum}\n===============`);
        console.log(`Total Price: ${results[0].price * pickNum}`);
        //console.log(`Quantity available: ${results[0].stock_quantity}`);
        addToShoppingList(results, pick, pickNum);
      } else if (parseInt(results[0].stock_quantity) < pickNum) {
        console.log("\nStock Unavailable\n=================");
        console.log(`Current quantity available: ${results[0].stock_quantity}`);

        Cconsole();
      }
    }
  );
}
///WORKING ON THIS ///
////////////////////////////////////////////
function Cconsole() {
  INQUIRER.prompt([
    {
      message: "Pick your product",
      type: "list",
      name: "pick",
      choices: [
        "Bud Lights",
        "Marlboro Lights",
        "Fire Extinguisher",
        "Mountain Dew",
        "Nico Patch",
        "Air Jordans",
        "Rockport kicks",
        "Cleaning Agent",
        "Lays",
        "Doritos"
      ]
    },
    {
      message: "How many do you need?",
      type: "integer",
      name: "pickNum"
    }
  ]).then(answers => {
    // query answer against database

    var pick = answers.pick;
    var pickNum = parseInt(answers.pickNum);
    console.log(pick, pickNum);
    checkOrder(pick, pickNum);
  });
}
///////////////////////////////////////////////////////
function Cmenu() {
  INQUIRER.prompt([
    {
      message: "Main Menu",
      type: "list",
      name: "menu",
      choices: ["Shop", "Shopping Cart", "Exit"]
    }
  ]).then(answers => {
    if (answers.menu === "Shop") Cconsole();
    else if (answers.menu === "Shopping Cart") shoppingCart();
    else if (answers.menu === "Exit") Exit();
  });
}

// Warehouse Console
function Wconsole() {
  console.log("Portal under construction\n");
  Main();
}
//////////////////////////////////////////////////////
function Main() {
  INQUIRER.prompt([
    {
      message: "What services do you require",
      type: "list",
      name: "service",
      choices: ["Customer", "Warehouse"]
    }
  ]).then(answers => {
    // Customer
    if (answers.service === "Customer") {
      console.log("\nHey Customer");
      Cmenu();
      //Cconsole();

      // Warehouse
    } else if (answers.service === "Warehouse") {
      console.log("\nHey Warehouse Staff");
      Wconsole();
    }
  });
}
///////////////////////////////////////////////////////////////////////
Main();
