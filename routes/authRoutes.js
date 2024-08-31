const router = require('express').Router();

const testUser = {
    username: 'test',
    password: 'password'
};

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.render('signup');
    }
});

router.post('/signup', (req, res) => {
    res.redirect('/login');
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === testUser.username && password === testUser.password) {
        req.session.loggedIn = true;
        res.redirect('/');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error('Cannot destroy session:', error);

            return res.status(500).send('Failed to logout');
        }
        res.redirect('/');
    }) 
})

module.exports = router;

