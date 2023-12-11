const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(express.json());
const post = [
    {
        username:"prasanna",
        title:"post 1"
    },
    {
        username:"prathap",
        title:"post 2"
    }
]
app.get("/post", authenticatetoken, (req, res) => {
    res.json(post.filter(post => post.username === req.user.name))
});
app.post("/login", (req, res) => {
    const username = req.body.username;
    const user = { name: username };
    const Accesstoken = jwt.sign(user, process.env.Access_token_secret);
    res.json({ Accesstoken: Accesstoken });
});
function authenticatetoken(req, res, next) {
    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.Access_token_secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })

}
app.listen(3000)
