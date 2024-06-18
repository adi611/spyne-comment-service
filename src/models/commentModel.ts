import mongoose, { Schema } from "mongoose";
import { TComment } from "../types/types";

const commentSchema = new Schema<TComment>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    discussionId: {
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
