require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const {v4} = require('uuid');

const RouterLogon = require('./routers/RouterLogon');
const RouterUserInfo = require('./routers/RouterUserInfo');
const RouterUserProfile = require('./routers/RouterUserProfile');

const PORT = process.env.PORT || 3000;
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

//Minin
let contacts = [
    {id: v4(), name: 'Ivan', value: '3', marked: false},
    // {id: v4(), name: 'Dima', value: '11', marked: false},
    // {id: v4(), name: 'Petro', value: '36', marked: false},
]

// app.get('/api/contacts', (req, res) => {
//     res.status(200).json(contacts)
// })

// app.post('/api/contacts', (req, res) => {
//     const contact = {...req.body, id: v4(), markep: false}
//     contacts.push(contact);
//     res.status(201).json(contact);
// }) 

// app.delete('/api/contacts/:id', (req, res) => {
//     try {
//         console.log(req.params.id);
//         contacts = contacts.filter(c => c.id !== req.paramas.id)
//         res.status(200).json({message: `Item id=${c.id} is deleted ...`});
//     } catch(error) {
//         console.log(error);
//     }
// }) 

app.get('/', (req, res) => {
    res.json({message: 'Server is already ... '})
})


app.use(cors({credentials: true, 'Access-Control-Allow-Origin': 'http://localhost:5173/test'}));
app.use(RouterLogon);
app.use(RouterUserInfo);
app.use(RouterUserProfile);

const start = async (req, res) => {
    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`Worker started on PORT ${PORT} PID ${pid}`);
        });
    } catch (err) {
        console.log(err);
    }
}

// process.on('SIGINT', () => {
//     console.log(`Signal is SIGINT`);
//     app.close(() => {
//         process.exit(0);
//     });
// });

// process.on('SIGTERM', () => {
//     console.log(`Signal is SIGTERM`);
//     app.close(() => {
//         process.exit(0);
//     });
// });

// process.on('SIGTERM2', () => {
//     console.log(`Signal is 2`);
//     app.close(() => {
//         process.exit(1);
//     });
// });


start();
