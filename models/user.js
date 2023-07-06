// Second Way of Creating
// Extending Model and calling init(attributes, options)

// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('./index');
module.exports = (sequelize, DataTypes, Model) => {
  class User extends Model {}

  User.init(
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique:true,  
        // validate:{
        //   isAlpha:{
        //     msg:'Only Alphabets are allowed'
        //   },
        //   isLowercase:true,
        //   len:[2,10]
        // } 
    },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: 'Singh',

        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "User", // We need to choose the model name
    }
  );

  // the defined model is the class itself
  console.log(User === sequelize.models.User); // true
  return User;
};
// First way of Creating Model
// Calling sequelize.define(modelName, attributes, options)

// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('./index');

// const User = sequelize.define('User', {
//   // Model attributes are defined here
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING,
//     defaultValue:'Singh'
//     // allowNull defaults to true
//   }
// }, {
//   // Other model options go here
//   tableName:'users',
//   // timestamps:false,
//   createdAt:false,
//   updatedAt:true
// });

// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

// module.exports = User;
