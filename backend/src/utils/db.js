const mongoose = require("mongoose");

const connectDB = async() => {
    console.log("runnnig")
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
};

module.exports = connectDB;