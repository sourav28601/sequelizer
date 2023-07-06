const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const User = require('./models/user');
// const Contact =  require('./models/contact');
// const sequelize = require('./models');
var UserController = require('./controller/UserController');

// automaticallly take index.js file
require('./models/index'); 

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/",(req,res)=>{
    res.send("home world");
});
// app.get("/add",UserController.addUser);
// app.get("/users",UserController.getUsers);
// app.get("/users/:id",UserController.getoneUsers);

// app.post("/createuser",UserController.postUsers);

// app.delete('/deleteuser/:id',UserController.deleteUser);

// app.patch('/updateuser/:id',UserController.updateUser);

// app.get("/query",UserController.queryUser);

// app.get("/finders",UserController.findersUser);

app.get("/validator",UserController.validatorUser);


app.get("/raw-queries",UserController.rawQueriesUser);

app.get("/one-to-one",UserController.oneToOneUser);


app.get("/one-to-many",UserController.oneToManyUser);

// Contact.sync({force:true});
// // // User.sync();
// User.sync({force:true});
// User.sync({alter:true});
// User.drop();

app.listen(9000,()=>{
    console.log('App will run on: http://localhost:9000');
});
