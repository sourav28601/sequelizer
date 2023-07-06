module.exports =(sequelize,DataTypes,Model)=>{
const Contact = sequelize.define('Contact', {
  // Model attributes are defined here
  permanent_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  current_address: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  user_id:DataTypes.INTEGER,
}
//  {
  // user_id:DataTypes.INTEGER,

  // sequelize, // We need to pass the connection instance
  // modelName: 'Contact' // We need to choose the model name
  // Other model options go here
// }
);

// `sequelize.define` also returns the model
console.log(Contact === sequelize.models.Contact); // true
return Contact;
}

