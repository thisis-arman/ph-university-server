import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { string } from "zod";


export const userSchema = new Schema<TUser>({

    id: {
        type: String,
        required: [true,"Id is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],

    },
    needsPasswordChange: {
        type: Boolean,
        default:true,
    },
    role: {
        type: String,
        enum: ["admin", "student", "faculty"],
        required: [true,"Role is required"]
    },
    status: {
        type: String,
        enum: ["in-progress", "blocked"],
        required:[true,"Status is required"]
    },
    isDeleted: {
        type: Boolean,
        default:false,
    }
})

export const User = model("User",userSchema)