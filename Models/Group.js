import mongoose from "mongoose";

const groupschema = mongoose.Schema({
  groupname: { type: "String", require: "true", trim: "true" },
  groupmembers: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: { type: "String", require: "true" },
    },
  ],
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: "String", require: "true" },
  },
  createdAt: { type: "Date", default: Date.now() },
  updatedAt: { type: "Date", default: Date.now() },
  messages: [{
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
});

export default mongoose.model("Groupschema", groupschema);
