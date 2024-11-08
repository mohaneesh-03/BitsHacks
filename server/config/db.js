const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://eswarnarayana797:hY0SlsGm7wZmDZ7J@cluster0.bk2y7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDB;
