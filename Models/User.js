import mongoose from "mongoose";


const SocialsSchema = mongoose.Schema({
    website: String,
    github: String,
    twitter: String,
    instagram: String,
    facebook: String
})


const UserSchema = mongoose.Schema({
    email: {
        required: true,
        unique: true,
        type: String
    },
    passwordHash: {
        required: true,
        type: String
    },
    userName: {
        required: true,
        type: String
    },
    avatarUrl: String,
    phone: String,
    address: String,
    profession: String,
    website: String,
    github: String,
    twitter: String,
    instagram: String,
    facebook: String
},
    {
        timestamps: true
    });


export default mongoose.model('User', UserSchema);




// address: null,
//     profession:null,
//     socialNetworks: {
//         website,
//         github,
//         twitter,
//         instagram,
//         facebook
//     }