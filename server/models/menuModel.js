const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    rname: {
        type: String
    },
    imgdata: {
        type: String
    },
    address: {
        type: String
    },
    delimg: {
        type: String
    },
    somedata: {
        type: String
    },
    price: {
        type: Number
    },
    rating: {
        type: String
    },
    arrimg: {
        type: String
    },
    qnty: {
        type: Number
    },
})

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;