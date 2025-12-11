import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
},
{ timestamps: true }
);

const Page = mongoose.model("Page", pageSchema);

export default Page;