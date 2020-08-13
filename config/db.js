const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  // await mongoose.connect(process.env.MONGODB_URI || db , {useUnifiedTopology : true, useNewUrlParser : true,useCreateIndex:true})
  //     console.log('MongoDB Connected...')
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error.message);
    //Exit Process with Failure
    process.exit(1);
  }
  //Mongoose Deprication Warning
  mongoose.set("useFindAndModify", false);
};

module.exports = connectDB;
