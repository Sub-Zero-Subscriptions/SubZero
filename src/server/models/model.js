const { Client } = require('pg');

const PG_URI = 'postgres://';

// create a new client here using the connection string above
const client = new Client({
  connectionString: PG_URI
});

client.connect();


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return client.query(text, params, callback);
  }
};