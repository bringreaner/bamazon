var inquirer = require('inquirer');
var mysql = require('mysql');
const cTable = require('console.table');
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

function displayTable() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.table(res);
        purchaseItem();
    })
    
}
displayTable();

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

//need an inquirer prompt with two ?s
function purchaseItem() {
    
    inquirer.prompt([/* Pass your questions in here */
        {
            type: "input",
            name: "searchbyID",
            message: "What is the ID of the product you would like to buy?",
        },
        {
            type: "input",
            name: "purchaseQuantity",
            message: "How many units would you like to buy?",
        }

    ]).then(function (answer) {
        var answer = answer;
        compareQuant(answer);
    })
};

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//need a function that compares the quantity with the quantity in the database
function compareQuant(answer) {
    //takes in customer inputted id#
    //brings up the associated item from the database
    connection.query("SELECT * FROM products WHERE item_id = ?", answer.searchbyID, function (err, res) {
        if (err) {
            throw err;
        }
        //console.log(answer.searchbyID)//console.log(res)//console.log(answer.purchaseQuantity)//console.log(res[0].stock_quantity)
        var customerQuant = answer.purchaseQuantity;
        var stockQuant = res[0].stock_quantity;
        var totalPrice = customerQuant * res[0].price;
        var chosenID = answer.searchbyID;

        //console.log (customerQuant);//console.log (stockQuant);//console.log (totalPrice);//}
        //if it the amount requested is <= to the amount in database it updates the database
        if (customerQuant <= stockQuant) {
            // This means updating the SQL database to reflect the remaining quantity.
            // Once the update goes through, show the customer the total cost of their purchase.
            //console.log("less than")
            var updatedQuant = stockQuant - customerQuant;
            // However, if your store does have enough of the product, you should fulfill the customer's order.
            //var params = [updatedQuant, chosenID];
            // updates quantity
            //connection.query("UPDATE products SET stock_quantity = ?", updatedQuant, "WHERE item_id = ?", answer.searchbyID)
            //connection.query("UPDATE bamazondb.products SET stock_quantity= stock_quantity - " + answer.quantityProduct + " WHERE id=?", [answer.chooseProduct], function (err, updatedRes)
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: updatedQuant
                    },
                    {
                        item_id: chosenID
                    }
                ],
                function (err, res) {
                    // shows customer total cost of their purchase

                    console.log("Item in stock! Your total price is: $" + totalPrice);
                    //console.log(updatedQuant);
                    //console.log(chosenID)
                    if (err) {
                        throw err;
                    }
                }
            )
        }
        else {
            // If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
            //if else logs insufficent quantity

            console.log("Insufficient quantity!")
        }
        //end connection
        connection.end(function (err) {
            // The connection is terminated now
        });
    })

}

// function updateDB {
//     connection.query("SELECT * FROM products WHERE item_id = ?", answer.searchbyID, function (err, res) {

// }


