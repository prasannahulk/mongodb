const express=require('express');
const bodyparser=require('body-parser');
const db=require('mongoose');
const app=express();
app.use(bodyparser.json());
const port=3000;


db.connect('mongodb://localhost:27017/student',{family:4});
db.connection.on('error',console.error.bind(console,"error while posting"));
db.connection.once('open',()=>{
    console.log("success");
});

const student=db.model('student',new db.Schema({
    name:String,
    age:Number,
    gender:String
}));

app.post("/students/addstudent",async(req,res)=>{
await new student (req.body).save();
res.send("saved");
});


  
app.get('/getAll',async(req,res)=>{

    const stu=await student.find();
    res.send(stu);

});
app.get('/getByName/:name',async(req,res)=>{

    const {name}=req.params;

    const stu=await student.findOne({name:name});
    res.send(stu);

});

app.put('/update/:name',async(req,res)=>{
    const {name}=req.params;

    const{age,mail,gender}=req.body;
  

   const stu=await student.updateOne({name:name},{$set:{age:age,mail:mail,gender:gender}});

    res.send("update Success");

})

app.delete('/delete/:name',async(req,res)=>{
    const {name}=req.params;

    const stu=await student.deleteOne({name:name});

    res.send("Delete Success");



})

app.listen(3000);