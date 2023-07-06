const { Op } = require("sequelize");
var db = require('../models/index');
var User = db.user;
var Contact = db.contact;
const { QueryTypes } = require('sequelize');

var addUser = async (req,res)=>{
    // using build method
    // const data = await User.build({ firstName: "Jane",lastName:"Singh" });

    // using create method
      const data =await User.create({ firstName: "Robbin",lastName:"Singh"});
    // console.log(data);
    
    console.log(data instanceof User); // true
    console.log(data.firstName); // "Jane"

    // set method
    // data.set({firstName: "Robby",lastName:"Singh"});
 
    // update method 
    // await data.update({firstName: "Robin",lastName:"Rajput"})
    // for save data in database
    await data.save();
    // delete the data 
    // await data.destroy();
    console.log('jane was saved to the database');
    console.log(data.toJSON());
    res.status(200).json(data.toJSON())
}

var getUsers = async(req,res)=>{
    const data = await User.findAll({});
    res.status(200).json({data:data})
}


var getoneUsers = async(req,res)=>{
    const data = await User.findOne({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data})
}

var postUsers = async(req,res)=>{
    var postData = req.body;
    // const data = await User.create(postData);
    // res.status(200).json({data:data})
    if(postData.length>1){
        var data = await User.bulkCreate(postData);
    }else{
        var data = await User.create(postData);
    }
    // const data = await User.create(postData);
    res.status(200).json({data:postData})
}

var deleteUser = async(req,res)=>{
    const data = await User.destroy({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data})
}

var updateUser = async(req,res)=>{
    var updateData = req.body;
    const data = await User.update(updateData,{
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data})
}

var queryUser = async(req,res)=>{
    // const data = await User.create({
    //     firstName: 'Ajay',
    //     lastName: 'Gupta'
    //   }, { fields: ['firstName'] });
    
    // const data = await User.findAll({
    //     // attributes: ['firstName', 'lastName']
    //     // change column name using alias and count column
    //     attributes: ['id',['firstName','first_Name'],
    //     [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
    // ]

    const data = await User.count({
        where: {
          id: {
            [Op.gt]: 3
          }
        }
      });
     
    // const data = await User.findAll({
        // remove column name
        // attributes: { 
        // exclude: ['firstName','lastName'],
        // include:['id',
        // [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
    // ]
    // order:[
    //     ['id','Desc']
    // ],
    // group :'lastName',
    // limit:1,
    // offset:1

    // where: {
    //     [Op.and]: [
    //       { id: 3 },
    //       { firstName: 'Raaju' }
    //     ]
    //   }
    // });

    res.status(200).json({data:data})
}



var findersUser = async(req,res)=>{

    // const data = await User.findAll({});

    // const data = await User.findOne({
    //     where:{
    //         lastName:'Rajput'
    //     }
    // });
//    find by primary key
    // const data = await User.findByPk(3);

    // const data = await User.findOne({
    //     where:{
    //         lastName:'Rajput'
    //     }
    // });
    // const [user, created] = await User.findOrCreate({
    //     where: { firstName: 'Sonu' },
    //     defaults: {
    //       lastName: 'Singh'
    //     }
    //   });

    const {count, rows} = await User.findAndCountAll({
        where: { lastName: 'Singh' },
      });
    res.status(200).json({data:rows,count:count});
}


var validatorUser = async(req,res)=>{
    var data={};
    var messages={};
    try {
        var data = await User.create({
            firstName:'Arun123',
            lastName:'kumar'
         });
        
    } catch (e) {
        // console.log(e.errors);
        let message;
        e.errors.forEach(error=>{
            switch(error.validatorKey){
                case 'isAlpha':
                    message:'only alphabates are allowed'
                    break;
                case 'isLowercase':
                    message:'only lowercase is allowed'
                    break;
                case 'len':
                    message:'min 2 max 10 characters allowed'
                    break;
            }
            messages[error.path]=message
        })
    }
    // const data = await User.create({
    //    firstName:'Arun123',
    //    lastName:'kumar'
    // });
    res.status(200).json({data:data,messages:messages});
}


var rawQueriesUser = async(req,res)=>{
  
    // const users = await db.sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT,model:User,mapToModel:true,  plain: false});

    const users = await db.sequelize.query(
        'SELECT * FROM users WHERE id = ?',
        {
          replacements: ['3'],
          type: QueryTypes.SELECT
        }
      );

// const users = await db.sequelize.query("SELECT * FROM users WHERE lastName =?", { 
//     replacement:['active'],
//     type:QueryTypes.SELECT
//  });

// We didn't need to destructure the result here - the results were returned directly
    // var updateData = req.body;
    // const data = await User.update(updateData,{
    //     where:{
    //         id:req.params.id
    //     }
    // });
    res.status(200).json({data:users})
}

var oneToOneUser = async(req,res)=>{
    // var data = await User.create({firstName:'sonu',lastName:'sahu'});
    // if(data && data.id){
    //     await Contact.create({permanent_address:'ab','current_address':'xy','user_id':data.id})
    // }
    // var data = await User.findAll({
    //     attributes:['firstName','lastName'],
    //     include:[{
    //        model:Contact,
    //        as:'contactDetails',
    //        attributes:['permanent_address','current_address'],
    //     }],
    //     where:{id:2}
    // });

    var data = await Contact.findAll({
        attributes:['permanent_address','current_address'],
        include:[{
           model:User,
           as:'userDetails',
           attributes:['firstName','lastName'],
        }],
        where:{id:2}
    });
    res.status(200).json({data:data});
}


var oneToManyUser = async(req,res)=>{
    // var data = await Contact.create({permanent_address:'Gwalior','current_address':'Noida','user_id':1})
    // var data = await User.findAll({
    //     attributes:['firstName','lastName'],
    //     include:[{
    //        model:Contact,
    //        as:'contactDetails',
    //        attributes:['permanent_address','current_address'],
    //     }],
    //     // where:{id:2}
    // });

    var data = await Contact.findAll({
        attributes:['permanent_address','current_address'],
        include:[{
           model:User,
           as:'userDetails',
           attributes:['firstName','lastName'],
        }],
        // where:{id:2}
    });
    res.status(200).json({data:data});
}


module.exports={
    addUser,
    getUsers,
    getoneUsers,
    postUsers,
    deleteUser,
    updateUser,
    queryUser,
    findersUser,
    validatorUser,
    rawQueriesUser,
    oneToOneUser,
    oneToManyUser
}