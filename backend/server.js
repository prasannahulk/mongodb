

const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyparser.json());

app.use(cors());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bike',
    port: 3306

});

db.connect((err) => {

    if (err) {
        console.log("Error Connecting Db");
    } else {
        console.log("DB Connected");
    }

});

app.post('/post', (req, res) => {

    const { name, brand, color } = req.body;
    db.query('insert into bike (name,brand,color) values (?,?,?)', [name, brand, color], (error, result, field) => {
        if (error) {
            console.log("post Error");
            res.status(500).send(error.stack);
        } else {
            console.log("Data Post Success");

            res.status(200).send(req.body);
        }

    })
});



app.get('/getAll',(req,res)=>{


    db.query('select * from bike ', (error, result, field) => {
        if (error) {
            console.log("getAll Error");
            res.status(500).send(error.stack);
        } else {
            console.log("GetAll Success");

            res.status(200).send(result);
        }

    })

})




app.get('/getById/:id',(req,res)=>{

 const {id}=req.params;
    db.query('select * from bike  where id=?',[id], (error, result, field) => {
        if (error) {
            console.log("GetById  Error");
            res.status(500).send(error.stack);
        } else {
            console.log("GetById Success");

            res.status(200).send(result);
        }

    })

})




app.delete('/deleteById/:id',(req,res)=>{

    const {id}=req.params;
       db.query('delete from bike where id =?',[id], (error, result, field) => {
           if (error) {
               console.log("Delete Error");
               res.status(500).send(error.stack);
           } else {
               console.log("DeleteById Success");
   
               res.status(200).send(result);
           }
   
       })
   
   })




   app.put('/update/:id', (req, res) => {
    const {id}=req.params;
    const { name, brand, color } = req.body;
    db.query('update bike set name=?,brand=?,color=? where id=?', [name, brand, color,id], (error, result, field) => {
        if (error) {
            console.log("post Error");
            res.status(500).send(error.stack);
        } else {
            console.log("Data Post Success");

            res.status(200).send(req.body);
        }

    })
});








app.listen(port, () => console.log(`Example app listening on port ${port}!`))