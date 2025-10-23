
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if(!MONGO_URI){
    throw new Error('PharmacyService URI is not defined in .env')
}

export const connectDB = async (retries = 8, delayMs = 3000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("✅ PharmacyService connected successfully");
      return;
    } catch (error) {
      console.log(`❌ PharmacyService connection error (attempt ${attempt}/${retries}):`, error.message);
      if (attempt === retries) {
        console.log("Exhausted PharmacyService DB connection attempts. Exiting.");
        process.exit(1);
      }
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
};