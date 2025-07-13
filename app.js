const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    
    if (!username || !password) {
        return res.status(400).send('Please fill all fields');
    }

  
    req.session.loggedIn = true;
    return res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
    if (!req.session.loggedIn) {
        return res.redirect('/');
    }
    res.send('Welcome to Dashboard!');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});