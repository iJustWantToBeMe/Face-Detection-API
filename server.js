const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// Endpoints Controllers
const register = require('./controllers/register');
const login = require('./controllers/login');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = knex({
	client: 'pg', // make sure your using postgreSQL
	connection: {
		host: '127.0.0.1', // localhost
		user: 'postgres', // add your database username here
		password: '', // add your password here
		database: '' // add your database name here
	}
});

const app = express();

app.use(express.json());
app.use(cors());

//                -------*Routes*-------
app.get('/', (req, res) => {
	res.send(database.users);
});
app.post('/login', login.handleLogin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleGetProfile(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res);
});
//                -------*Routes*-------

app.listen(3000, () => {
	console.log('app is running on port 3000');
});

// 			*Use code below for deploying online*
// app.listen(process.env.PORT || 3000, () => {
// 	console.log(`app is running on port ${process.env.PORT}`);
// });
