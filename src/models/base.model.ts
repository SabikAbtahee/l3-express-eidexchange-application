import { randomUUID } from "crypto";
import { Schema } from "mongoose";

const BaseSchema = new Schema({
    _id: {
        type: String,
        default: () => randomUUID(),
        trim: true
    },
    LastUpdateDate: {
        type: Date,
    },
    CreateDate: {
        type: Date,
        default: Date.now
    },
})

BaseSchema.pre("save", function (this: any, next: () => void) {
    this.LastUpdateDate = Date.now();
    next();
});

export default BaseSchema; 
