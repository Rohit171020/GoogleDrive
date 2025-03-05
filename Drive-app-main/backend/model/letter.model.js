import mongoose from "mongoose";

const LetterSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    title: { type: String, required: true },
    googleDriveId: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const letterModel =
    mongoose.models.letter || mongoose.model("letter", LetterSchema);

export default letterModel;
