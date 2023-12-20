import { Client } from 'pg';

const PG_URI = 'postgres://yysmplmk:55twtSJzsQp2o_0wW3aHRHxBl1QQPELU@bubble.db.elephantsql.com/yysmplmk';

// create a new client here using the connection string above
const client = new Client({
  connectionString: PG_URI
});

client.connect();

export const query = (text, params, callback) => {
  console.log('executed query', text);
  return client.query(text, params, callback);
};

// module.exports = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return client.query(text, params, callback);
//   }
// };