// import DB functions 

const userController = {

    authUser(req, res, next) {
        console.log('req.body', req.body);
        const { email, password } = req.body;
        
        console.log('email ', email, 'pass ', password);
        const testEmail = 'tyler@gmail.com'
        const testPass = 'password';

        if (email !== testEmail || password !== testPass) {
            console.log('I am in the if block.')
            next(new Error('Invalid Email or Password'));
        } else {
            // logged in GET subscriptions Let's talk with Dana about how to link them. Maybe it makes more sense to just GET them separately.
            console.log('I am the else block.')
            console.log('login successful');
            next();
        }
    console.log('This is the ned of the controller. Woops!')
    },

    signUp(req, res, next) {
        console.log(req.body);
        const { firstName, lastName, email, password } = req.body;
        console.log('firstName ', firstName);
        console.log('lastName ', lastName);
        console.log('email ', email);
        console.log('password ', password)
        // user creation call to DB //
        console.log('User Created');
        next();
    }

};

export default userController;
