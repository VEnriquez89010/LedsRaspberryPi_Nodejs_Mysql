var Sequelize = require('sequelize');

var mysql_host = process.env.MYSQLHOST;
if(mysql_host == undefined || mysql_host == ""){
    mysql_host = 'localhost';
}
var mysql_pass = process.env.MYSQLPASS;
if(mysql_pass == undefined || mysql_host == ""){
    mysql_pass = 'raspberry'; 
}

var sequelize = new Sequelize('led', 'root', mysql_pass, {
  host: mysql_host,
  dialect: 'mysql'
});

var Host = sequelize.define('Hosts', {
  "id": { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  "host": { type: Sequelize.STRING },
  "led":{ type: Sequelize.STRING },
  "status":{ type: Sequelize.STRING }
});

Host.sync();
module.exports = Host;
