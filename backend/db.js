const mongoose = require('mongoose');


const MongoDB = async () => {
  try {
    await mongoose.connect(mongoURI); // No need for additional options
    console.log('Connected to MongoDB');
    const fetched_data= await mongoose.connection.db.collection("Cantech");
    fetched_data.find({}).toArray(function(err,data){
        if(err)console.log(err);
        else console.log(data);
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application if connection fails
  }
};

module.exports = MongoDB;
