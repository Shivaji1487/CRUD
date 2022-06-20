const express = require("express");

const mysql = require ("mysql");
const app = express();

//create connection step: 2
const db=mysql.createConnection({
host:"localhost",
user:"root",
password:"",
database:"test2"
});

//connect to database step:3
db.connect((err)=>{
    if (err) {
        throw err;
    }
    console.log("Connection Done");
});
//create DB step: 4
app.get("/createdb",(req, res)=>{
    let sql = "CREATE DATABASE test2";
    db.query(sql,(err,result)=>{
        if (err) throw err;  //if error
        console.log("result"); //print result
        res.send("Database created");
    });
});
//create table  step 5
app.get("/createproducttable",(req,res)=>{
    let sql= "CREATE TABLE product(id int AUTO_INCREMENT,name VARCHAR(150),body VARCHAR(250),PRIMARY KEY(id))";
    db.query(sql,(err,result)=>{
        if (err) throw err;  //if error
        console.log("result"); //print result
        res.send("product table created");
    });
});

//addProduct/INSERT in table step 6
app.get("/addproduct",(req,res)=>{
    let product = {name:"KeyOne",body:"This is a BlackBerry phone"};
    let sql="INSERT INTO product SET ?"
    let query=db.query(sql,product,(err,result)=>{

        if (err) throw err;  //if error
        console.log("result"); //print result
        res.send(" Product Added");

    });
});

//Select product (it will show all product )

app.get("/getproduct",(req,res)=>{
    
    let sql="SELECT * FROM product";
    let query=db.query(sql,(err,result)=>{

        if (err) throw err;  //if error
        console.log(result); //print result
        res.send("Product Information Display");

    });
});

//Select single product (it will show single product )

app.get("/getproduct/:id",(req,res)=>{
    
    let sql= `SELECT * FROM product WHERE id= ${req.params.id}`;
    let query=db.query(sql, (err,result)=>{

        if (err) throw err;  //if error
        console.log(result); //print result
        res.send("Single Product Information Display");

    });
});

//Update product 

app.get("/updateproduct/:id",(req,res)=>{
    let newName= "Nokia";
    let sql= `UPDATE product SET name= '${newName}' WHERE id= ${req.params.id}`;
    let query = db.query(sql, (err,result)=>{

        if (err) throw err;  //if error
        console.log(result); //print result
        res.send("Product Updated");
    });
});

//Delete product 

app.get("/deleteproduct/:id",(req,res)=>{
    
    let sql= `DELETE FROM product WHERE id= ${req.params.id}`;
    let query = db.query(sql, (err,result)=>{

        if (err) throw err;  //if error
        console.log(result); //print result
        res.send("Product deleted");
    });
});

app.listen("3000",()=>{
    console.log("Server is running");
});
