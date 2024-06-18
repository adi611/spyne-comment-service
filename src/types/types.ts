import mongoose from "mongoose";

export type TComment = {
  user: mongoose.Types.ObjectId;
  discussion: mongoose.Types.ObjectId;
  text: string;
  likes: mongoose.Types.ObjectId[];
  replies: mongoose.Types.ObjectId[];
};
