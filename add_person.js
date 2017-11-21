const settings = require("./settings");
const args = process.argv.slice(2);
const firstName = args[0];
const lastName = args[1];
const birthdate = args[2];

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

knex.insert({
  first_name: `${firstName}`,
   last_name: `${lastName}`,
   birthdate: `${birthdate}`
}).into('famous_people').then(function(id) {

  console.log('Inserted Successfully');
  knex.destroy();
});