import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
})


const User = mongoose.models.User || mongoose.model('User', useSchema);
export default User