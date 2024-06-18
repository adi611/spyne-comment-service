import mongoose, { Schema } from "mongoose";
import { TComment } from "../types/types";

const commentSchema = new Schema<TComment>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
      required: true,
    },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Comment = mongoose.model<TComment>("Comment", commentSchema);
export default Comment;
