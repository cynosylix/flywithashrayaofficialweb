// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   console.error("MONGODB_URI is not defined. Please set the environment variable.");
//   throw new Error("MONGODB_URI environment variable is required");
// }

// // Enhanced connection options for serverless
// const options = {
//   bufferCommands: false,
//   maxPoolSize: 1, // Limit to 1 connection for serverless
//   serverSelectionTimeoutMS: 10000, // 10 second timeout
//   socketTimeoutMS: 45000, // 45 second socket timeout
//   bufferMaxEntries: 0,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectionToDatabase() {
//   if (cached.conn) {
//     // Check if connection is still alive
//     if (mongoose.connection.readyState === 1) {
//       return cached.conn;
//     }
//   }

//   if (!cached.promise) {
//     const uri = MONGODB_URI;
    
//     cached.promise = mongoose.connect(uri, options)
//       .then((mongoose) => {
//         console.log("MongoDB connected successfully");
//         return mongoose;
//       })
//       .catch((error) => {
//         console.error("MongoDB connection error:", error);
//         // Reset promise on error
//         cached.promise = null;
//         throw error;
//       });
//   }
  
//   try {
//     cached.conn = await cached.promise;
//     return cached.conn;
//   } catch (error) {
//     cached.promise = null;
//     throw error;
//   }
// }

// export default connectionToDatabase;
