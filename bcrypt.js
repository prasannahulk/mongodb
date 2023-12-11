const express=require('express');
const bcrypt=require('bcrypt');
const app=express();
app.use(express.json());

const users=[];

app.post("/post",async (req,res)=>{
    const hasPassword=await bcrypt.hash(req.body.password,10);
    const user={name:req.body.name,password:hasPassword}
    
users.push(user);
res.status(200).send("saved");


app.get("/get",(req,res)=>{
    res.status(200).send(users);
})


app.post("/login", async (req, res) => {
    const user = users.find(u => u.name === req.body.name);
    if (!user) {
        return res.status(400).send("User not found");
    }
    
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (passwordMatch) {
        res.status(200).send("Login successful");
    } else {
        res.status(401).send("Incorrect password");
    }
});
});
app.listen(3000);