import express from 'express';

export const userAuth = express.Router();

userAuth.get('/login', (req, res) => {
    res.send('User Login');
});

userAuth.get('/register', (req, res) => {
    res.send('User Register');
});