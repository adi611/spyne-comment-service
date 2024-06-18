import mongoose from "mongoose";

export type TComment = {
  userId: mongoose.Types.ObjectId;
  discussionId: mongoose.Types.ObjectId;
  text: string;
  likes?: mongoose.Types.ObjectId[];
  replies?: mongoose.Types.ObjectId[];
};
