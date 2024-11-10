const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mohaneesh33rd:Nomorefuckups1@cluster0.wbbeb.mongodb.net/Hackathon");
    console.log('MongoDB connected');

    // const studentSchema = mongoose.Schema({
    //   name: String,
    //   passowrd: String,
    //   email: String,
    //   hackathonid: { type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon' },
    //   teamid: {type: mongoose.Schema.Types.ObjectId, ref:'Team'},
    // })
    // module.exports = mongoose.model('Student', studentSchema);
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDB;
