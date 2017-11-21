const settings = require("./settings");
const args = process.argv[2];

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

function findPerson(id, firstName, lastName, birthdate) {
  console.log('Searching...');
  console.log(`Found 1 person(s) by the name of '${args}'`);
  console.log(`- ${id}: ${firstName} ${lastName}, born '${birthdate}'`);
}

knex.select().from('famous_people')
.where('first_name', '=', args)
.orWhere('last_name', '=', args)
.asCallback(function(err, rows) {
  if (err) return console.error(err);

  let foundPerson = rows[0];
  if(foundPerson) {
    findPerson(foundPerson.id, foundPerson.first_name, foundPerson.last_name, foundPerson.birthdate);
  } else {
      console.log('Searching...');
      console.log(`No person exists by the name of ${args}`);
  }
});
