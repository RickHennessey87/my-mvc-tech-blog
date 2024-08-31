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

module.exports = router;

