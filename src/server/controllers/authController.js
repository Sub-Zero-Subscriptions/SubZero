const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.POSTGRES_URI
})
// async function test() {
//     const result = await pool.query('SELECT * FROM subscriptions')
//     console.log(result.rows);    
// }

// test();

const SALT_WORK_FACTOR = 10;

const authcontroller = {};

//generates a jwt
function createToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
}

//generates a hashed password
function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
            if(err) {
                reject({
                    log: `Error hashing password`,
                    status: 500,
                    message: { err: `Error in signup`},
                    });
            } else {
               resolve(hash) 
            }
        })
    })
}
//controller for a new user signing up
authcontroller.signup = async (req, res, next) => {
    console.log('signup controller invoked');
    try {
        //get username and password from req.body. If either are falsy, invoke global error handler
        const {username, password} = req.body;
        if(!username || !password) {
            return next(
                {
                    log: 'Username or password not submitted', 
                    status: 422,
                    message: { err: 'Username or password not submitted' },
                }
            )
        }

        //check if username already exists in DB
        const selectValues = [username];
        const selectQuery = `
            SELECT 1
            FROM users
            WHERE users.username = $1
        `;
        const userDetails = await pool.query(selectQuery, selectValues);
        if(userDetails.rowCount > 0) {
            return next(
                {
                    log: 'Username already exists',
                    status: 409,
                    message: { err: 'Username already exists' },        
                }
            )
        }
        
        //create new user with hashpassword
        const hashedPassword = await hashPassword(password);
        console.log('Hashed Password: ',hashedPassword);
        const insertQuery = `
            INSERT INTO users (username, hashpassword)
            VALUES ($1, $2)
            RETURNING _id
        `;

    }
    catch{
        next({
            log: `Express error handler caught middleware error in authcontroller.signup. Error: ${error}`,
            status: 500,
            message: { err: `Error in signup: ${error}`},
        })
    }
}

//authcontroller.login = 

//authcontroller.isLoggedIn = 



module.exports = authcontroller;