// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const { Pool } = require('pg');

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URI
})


const SALT_WORK_FACTOR = 10;

const authController = {};

//generates a jwt
function createToken(_id) {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
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
authController.signup = async (req, res, next) => {
    console.log('signup controller invoked');
    try {
        //get email and password from req.body. If either are falsy, invoke global error handler
        const {email, password, firstname, lastname} = req.body;
        if(!email || !password || !firstname || !lastname) {
            return next(
                {
                    log: 'Full name, email or password not submitted', 
                    status: 422,
                    message: { err: 'Incomplete field at Sign up' },
                }
            )
        }

        //check if email already exists in DB
        const selectValues = [email];
        const selectQuery = `
            SELECT 1
            FROM users
            WHERE users.email = $1
        `;
        const userDetails = await pool.query(selectQuery, selectValues);
        if(userDetails.rowCount > 0) {
            return next(
                {
                    log: 'email already exists',
                    status: 409,
                    message: { err: 'email already exists, please login' },        
                }
            )
        }
        
        //create new user with hashpassword
        const hashedPassword = await hashPassword(password);
        console.log('Hashed Password: ', hashedPassword);
        const insertValues = [email, hashedPassword, firstname, lastname];
        const insertQuery = `
            INSERT INTO users (email, hashpassword, firstname, lastname)
            VALUES ($1, $2, $3, $4)
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

        //create jwt for user and attach as a cookie
        const token = createToken(userId);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true
        });

        res.locals.message = 'Successfully add new user!';
        next();
    }
    catch(error){
        next({
            log: `Express error handler caught middleware error in authController.signup. Error: ${error}`,
            status: 500,
            message: { err: `Error in signup: ${error}`},
        })
    }
};

authController.login = async (req, res, next) => {
    console.log('login controller invoked');
    try {
        const { email, password } = req.body;
        //search for the input email in the DB
        const queryValue = [email];
        const queryUser = `
            SELECT _id, hashedPassword
            FROM users
            WHERE email = $1
        `;
        const userDetails = await pool.query(queryUser, queryValue);

        //error handling if unable to find existing email in DB
        if(userDetails.rowCount !== 1) {
            return next(
                {
                    log: `Express error handler caught middleware error in authController.login. Singular email not found`,
                    status: 500,
                    message: { err: `Credentials not found. Do you have an account? If not sign up for one.`},
                }
            )
        }
        const dbPassword = userDetails.rows[0].hashpassword
        console.log('DB Password: ', dbPassword);
        console.log('Req.body Password :', password);
        const result = await bcrypt.compare(password, dbPassword)
        console.log('Bcrypt compare result :', result);
        if(!result) {
            return next({
                log: `Express error handler caught middleware error in authController.login. Password did not match`,
                status: 500,
                message: { err: `email/Password combo is not correct`},               
            });
        };

        const userId = userDetails.rows[0]._id

        //create jwt for user and attached as a cookie
        const token = createToken(userId); // pass in primary key id
        res.cookie('token', token, {
            httpOnly: true,
            secure: true
        })

        // add email to res.locals and invoke next
        res.locals.user = email;
        next();
    }
    catch(error) {
        next({
            log: `Express error handler caught middleware error in authController.signup. Error: ${error}`,
            status: 500,
            message: { err: `email/Password combo is not correct. Please retry.`},
        })
    }
};

//controller for if user if already logged in
authController.isLoggedIn =  async (req, res, next) => {
    console.log('isLoggedIn controller invoked');
    try {
        const { token } = req.cookies;
        console.log(token);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch(error){
        next({
            log: `Express error handler caught middleware error in authController.isLoggedIn. Error: ${error}`,
            status: 500,
            message: { err: `Error in checking if logged in: ${error}`},
        })
    }
};

export default authController;