const { Sequelize,DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', '', {
    host: 'localhost',
    logging:false,
    dialect:'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' |'oracle' */
  });

try{
    sequelize.authenticate();
    console.log('connection has been established successfully.');
}catch(error){
    console.error('unable to connect to the database:',error);
}

const db ={}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contact = require('./contact')(sequelize,DataTypes,Model);
db.user = require('./user')(sequelize,DataTypes,Model);



// One-To-Many relationships
db.user.hasMany(db.contact,{foreignKey: 'user_id',as:'contactDetails'});
db.contact.belongsTo(db.user,{foreignKey: 'user_id',as:'userDetails'});


// Many To Many relationships
// db.user.belongsToMany(db.user, { through: 'user_contacts' });
// db.contact.belongsToMany(db.contact, { through: 'user_contacts' });



// for one-To-one
// db.user.hasOne(db.contact,{foreignKey: 'user_id',as:'contactDetails'});
// db.contact.belongsTo(db.user,{foreignKey: 'user_id',as:'userDetails'});

db.sequelize.sync({force:true});
// sequelize.sync({force:false});
module.exports = db;