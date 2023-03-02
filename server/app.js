require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const RouterLogon = require('./routers/RouterLogon');
const RouterUserInfo = require('./routers/RouterUserInfo');
const RouterUserProfile = require('./routers/RouterUserProfile');
const mwError = require('./middleware/mwError');

const PORT = process.env.PORT || 3000;

// const DB = 'mongodb+srv://user:user@cluster0.5y3d0h7.mongodb.net/?retryWrites=true&w=majority'
const DB = 'mongodb://user:user@ac-vtc03fs-shard-00-00.5y3d0h7.mongodb.net:27017,ac-vtc03fs-shard-00-01.5y3d0h7.mongodb.net:27017,ac-vtc03fs-shard-00-02.5y3d0h7.mongodb.net:27017/?ssl=true&replicaSet=atlas-s64huf-shard-0&authSource=admin&retryWrites=true&w=majority'
                             
const pid = process.pid;

const app = express();

app.use(express.static(path.resolve(__dirname, 'clientVue')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.json({message: 'Server is already ... '})
})


app.use(cors({credentials: true, 'Access-Control-Allow-Origin': 'http://localhost:5173'}));
app.use(RouterLogon);
app.use(RouterUserInfo);
app.use(RouterUserProfile);

app.use(mwError);

const start = async (req, res) => {
    try {
        await mongoose.set('strictQuery', false);
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`Worker started on PORT ${PORT} PID ${pid}`);  
        });
    } catch(err) {
        console.log(err);
    }
}


start();
