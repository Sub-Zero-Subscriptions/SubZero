import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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
        const insertValues = [username, hashedPassword];
        const insertQuery = `
            INSERT INTO users (username, hashpassword)
            VALUES ($1, $2)
            RETURNING _id
        `;
        const newUser = await pool.query(insertQuery, insertValues);

        //error handling if unable to insert new user into DB
        if(newUser.rowCount === 0) {
            return next(
                {
                    log: 'Failed to insert new user into DB',
                    status:500,
                    message: {err: 'Error adding new user'}
                }
            )
        }
        const userId = newUser.rows[0]._id; //primary key of user table = _id

        //create jwt for user and attached as a cookie
        const token = createToken(userId);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true
        });

        res.locals.message = 'Successfully add new user!';
        next();
    }
    catch{
        next({
            log: `Express error handler caught middleware error in authcontroller.signup. Error: ${error}`,
            status: 500,
            message: { err: `Error in signup: ${error}`},
        })
    }
};

authcontroller.login = async (req, res, next) => {
    console.log('login controller invoked');
    try {
        const { username, password } = req.body;
        //search for the input username in the DB
        const queryValue = [username];
        const queryUser = `
            SELECT _id, hashedPassword
            FROM users
            WHERE username = $1
        `;
        const userDetails = await pool.query(queryUser, queryValue);

        //error handling if unable to find existing username in DB
        if(userDetails.rowCount !== 1) {
            return next(
                {
                    log: `Express error handler caught middleware error in authcontroller.login. Singular username not found`,
                    status: 500,
                    message: { err: `Credentials not found. Do you have an account? If not sign up for one.`},
                }
            )
        }
        const dbPassword = userDetails.rows[0].hashpassword
        console.log('DB Password: ', dbPassword);
        console.log('Req.body Password :', password);
        const result = bcrypt.compare(password, dbPassword)
        console.log('Bcrypt compare result :', result);
        if(!result) {
            return next({
                log: `Express error handler caught middleware error in authcontroller.login. Password did not match`,
                status: 500,
                message: { err: `Username/Password combo is not correct`},               
            });
        };

        const userId = userDetails.rows[0]._id

        //create jwt for user and attached as a cookie
        const token = createToken(userId); // pass in primary key id
        res.cookie('token', token, {
            httpOnly: true,
            secure: true
        })

        // add username to res.locals and invoke next
        res.locals.user = username;
        next();
    }
    catch {
        next({
            log: `Express error handler caught middleware error in authcontroller.signup. Error: ${error}`,
            status: 500,
            message: { err: `Username/Password combo is not correct. Please retry.`},
        })
    }
};

//controller for if user if already logged in
authcontroller.isLoggedIn =  async (req, res, next) => {
    console.log('isLoggedIn controller invoked');
    try {
        const { token } = req.cookies;
        console.log(token);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch(error){
        next({
            log: `Express error handler caught middleware error in authcontroller.isLoggedIn. Error: ${error}`,
            status: 500,
            message: { err: `Error in checking if logged in: ${error}`},
        })
    }
};

module.exports = authcontroller;