const args = process.argv[2];

const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function findPerson(id, firstName, lastName, birthdate) {
  console.log(`- ${id}: ${firstName} ${lastName}, born '${birthdate}'`);
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name = '${args}' OR last_name = '${args}';`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    let foundPerson = result.rows[0];

    if(foundPerson) {
      console.log('Searching...');
      console.log(`Found 1 person(s) by the name of '${args}'`);
      findPerson(foundPerson.id, foundPerson.first_name, foundPerson.last_name, foundPerson.birthdate);
      client.end();
    } else {
      console.log(`No person exists by the name of ${args}`);
      client.end();
    }
  });
});