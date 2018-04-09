USE bamazon;
-- 
-- CREATE TABLE products (
-- 	item_id INT NOT NULL AUTO_INCREMENT,
--     product_name VARCHAR (255),
--     department_name VARCHAR (255),
--     price DECIMAL (10,2),
--     stock_quantity INTEGER,
--     PRIMARY KEY (item_id)
-- )

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Slaughterhouse Five", "books", 5.00, 5),
("Comic Book Tattoo", "books", 20.00, 2),
("milk tea packets", "drinks", 8.00, 30),
("mango lassi mix", "drinks", 8.00, 25),
("igneous rock", "rocks", 100.00, 3),
("sedimentary rock", "rocks", 0.50, 100),
("chew-bacca", "cat toys", 7.00, 80),
("cat-sle", "cat toys", 150.00, 5),
("India ink", "art supplies", 7.00, 40),
("watercolor set", "art supplies", 15.00, 30);
