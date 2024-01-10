const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.mongoUrl);
        console.log('MongoDb Conencted');

    } catch(error){
        console.log(`Connection issue ${error}`);

    }
};

module.exports = connectDB;



