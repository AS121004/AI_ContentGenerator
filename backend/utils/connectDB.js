const mongoose = require("mongoose");
//PASS: '"mongodb+srv://twentekghana:I0XU4wUzi9rZCBil@masync-mern-ai.24hgrcc.mongodb.net/masync-mern-ai?retryWrites=true&w=majority"'
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            "mongodb+srv://anshul12102004:2GynQbaGe1kw1s5h@cluster0.6mdtg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );

        console.log(`Mongodb connected ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;