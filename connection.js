const mongoose = require('mongoose')

function connectMogodb(url) {
    return mongoose.connect(url);    
}

module.exports = connectMogodb