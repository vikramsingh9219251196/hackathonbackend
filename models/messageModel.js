
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    message: {
      text: { type: String },
      type: {
        type: String,
        enum: ["text", "image"],
        default: "text",
      },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Messages', MessageSchema);
