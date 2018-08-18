
// Create constant for inquirer and mysql npm libraries. 
//connnection method: createConnection method of mysql library 
//used to create a connection with the database.
//Connection query contains host, port, user, password, database 
var INQUIRER  = require('inquirer');
var   MYSQL  = require('mysql');
 

var connection = MYSQL.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

// connection.connect();
displayInventory(); //show user what you have
runPrompt(); // ask them what you want


function runPrompt(){
    INQUIRER.prompt([{
        type:'integer' ,
        name: 'requestId',
        message: "What's the ID of the product you want? \n"
    
    },{
        type:'integer',
        name: 'requestSize',
        message: "So how many units of these will you be needing? \n \n \n"
    
    }]).then( function(answer){ 
        var requestId = parseInt(answer.requestId);
        var requestSize= parseInt(answer.requestSize);
        console.log(requestId, requestSize);
        checkOrder(requestId, requestSize);
    
     })
}


function displayInventory(){;
    connection.query('SELECT item_id, product_name, price FROM products',  function(error,result){
        if(error) throw error;
        // console.log(result);  
        result.forEach(row => {
            console.log(`Id: ${row.item_id} | Name: ${row.product_name} | Price: ${row.price}\n` )

        });
        
    });
};
 


function checkOrder(requestId, requestSize){
    
    if(Number.isInteger(requestId)){
        if(Number.isInteger(requestSize)){
            // console.log('valid:' + requestId +' '+ requestSize);
            /////////////////////////////////////
            connection.query('SELECT * FROM products', function (error, res) {
                if (error) throw error;
                var prod;
                // console.log(res);
                for(var i = 0; i < res.length; i++){
                  if(res[i].item_id == requestId){
                      
                    prod = res[i]
                  }
                }
                console.log("\n \n \nProduct details: \n \n",prod)
                

                  if(prod.stock_quantity >= requestSize){
                      
                    completeOrder(prod, requestId, requestSize);
                    
                    connection.end()

                    

                  }else{
                    console.log("sorry the order has been cancled, there was insuffecent stock of this purchase")
                    connection.end()
                  }
              })


            //////////////////////////////////////   

        }
    }
        
    
    
}


function completeOrder(prod, requestId, requestSize){
    
    let newQty= prod.stock_quantity - requestSize;
    // console.log("\n Quantitiy of "+prod.product_name + " left is: "+newQty);
    printBill(prod, requestId, requestSize);
    
    connection.query('Update products SET stock_quantity = \' '+ newQty+ ' \' WHERE item_id = \' '+requestId+ ' \'   ', function(error, result){
        if(error) throw error;
        
    // connection.end()
    })
     
    connection.query('SELECT stock_quantity FROM product WHERE item_id ='+requestId,function(er,re){
        // if(er) throw er;
     
         
    
    })

    

   
   
}

function printBill(prod, requestId, requestSize){
    console.log("\n Total Cost is: $"+prod.price*requestSize + " Only");
}

// Challenge #1: Customer View (Minimum Requirement)

// item_id (unique id for each product)
// product_name (Name of product)
// department_name
// price (cost to customer)
// stock_quantity (how much of the product is available in stores)




// Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
// The app should then prompt users with two messages.



// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.



// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.



// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



// However, if your store does have enough of the product, you should fulfill the customer's order.


// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.