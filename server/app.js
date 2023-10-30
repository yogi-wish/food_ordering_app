const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');


const Menu = require('./models/menuModel');

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

const db = process.env.MONGO_URI;
mongoose.connect(db).then(con => {
    // console.log(con.connections);
    console.log('DB connected successfully');
})

app.get('/api/v1/menus', async (req, res) => {
    try {
        const menus = await Menu.find();
        // console.log(menus);
        res.status(200).json({
            status: "success",
            data: {
                menus: menus
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }

})


const port = 8000 || process.env.PORT;
app.listen(port, () => {
    console.log(`app is listening in port ${port}`);
})
