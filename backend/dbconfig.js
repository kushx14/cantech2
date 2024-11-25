const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DATABASE_URI); // No deprecated options
        console.log("Connected to MongoDB");
        
        // Fetch data from collections
        const foodDataCollection = mongoose.connection.db.collection("foodData");
        const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");

        const fetched_data = await foodDataCollection.find({}).toArray();
        const foodCategory = await foodCategoryCollection.find({}).toArray();

        // console.log(fetched_data);
        
        // Assign to global variables
        global.food_items = fetched_data;
        global.food_category = foodCategory;
        // console.log("done");
        
    } catch (err) {
        console.error("Error connecting to MongoDB or fetching data:", err);
    }
};

module.exports = connectDB;
