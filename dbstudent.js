const express=require('express');
const bodyparser=require('body-parser');
const mysql=require('mysql2');
const app=express();
const port=3000;
app.use(bodyparser.json());

const db=mysql.createConnection ({
host:'localhost',
user:'root',
password:'root',
port:3306,
database:'student',
});

db.connect((err)=>{
if(err){
    console.error("error show"+err.stack);
}
else{
    console.log("db success"+db.threadId);
}
})

app.post('/postdata',(req, res)=> {
    const {name,gender,age} =req.body;
    db.query('insert into students(name,gender,age)values(?,?,?)',[name,gender,age],(error,result,field)=>{
        if(error){
        console.log(error);
        res.status(500).send("insert error");
        }
        else{
        res.status(200).send("successfull")
        }
    }); 
});

app.get('/getall', (req, res) => {
    db.query('select * from students' ,(error,result,field)=>{
        if(error){
            console.log(error);
    res.status(500).send("get error");
        }
        else{
        res.status(200).send(result);
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id; 
    db.query('Delete from students where id = ?', [id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error deleting data");
        } else {
                res.status(200).send(` ID ${id} deleted successfully`);
            }
    });
});

app.put('/put/:id', (req, res) => {
    const id = req.params.id; 
    const {name,gender,age} =req.body;
    db.query('UPDATE students SET name = ?, gender = ?, age = ? WHERE id = ?', [name, gender, age, id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error updating data");
        } else {
                res.status(200).send(` ID ${id} update successfully`);
            }
    });
});

    app.listen(port, () => console.log(`port running by prasanna ${port}`))
