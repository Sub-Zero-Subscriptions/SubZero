const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// importing postgres uri and creating pool as temporary solution. Later will need to import the file where this pool is created
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.POSTGRES_URI
})

const SALT_WORK_FACTOR = 10;

const authcontroller = {}