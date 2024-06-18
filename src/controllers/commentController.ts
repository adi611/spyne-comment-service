import { Request, Response } from "express";
import Comment from "../models/commentModel";
import { ServiceNames, fetchFromService } from "../utils/fetchFromService";
import { TComment } from "../types/types";

export const commentOnDiscussion = async (req: any, res: Response) => {
  const { discussionId, text } = req.body;
  try {
    const comment = new Comment({
      userId: req.user.id,
      discussionId,
      text,
    } as TComment);

    await comment.save();

    await fetchFromService(ServiceNames.DISCUSSIONS, {
      method: "PUT",
      url: `/${discussionId}`,
      body: {
        comment: comment._id,
      },
    });

    res.status(201).json(comment);
  } catch (error: any) {
    console.error("Error in commentOnDiscussion:", error);
    res.status(500).json({ message: error.message });
  }
};

export const likeComment = async (req: any, res: Response) => {
  const { commentId } = req.body;

  try {
    const comment = await Comment.findById(commentId);

    if (comment) {
      const userId = req.user.id;
      comment.likes =
        userId.toString() !== comment.userId.toString()
          ? [...(comment.likes ?? []), userId]
          : comment.likes;

      await comment.save();
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    console.error("Error in likeComment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const replyToComment = async (req: any, res: Response) => {
  const { commentId, text } = req.body;

  try {
    const reply = new Comment({
      userId: req.user.id,
      discussionId: req.body.discussionId,
      text,
    } as TComment);

    await reply.save();

    const comment = await Comment.findById(commentId);
    if (comment) {
      comment.replies = [...(comment.replies ?? []), reply._id];
      await comment.save();
    }

    res.status(201).json(reply);
  } catch (error) {
    console.error("Error in replyToComment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req: any, res: Response) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);

    if (comment) {
      if (comment.userId.toString() !== req.user.id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
      }

      await Comment.deleteOne({ _id: id });
      res.status(200).json({ message: "Comment removed" });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    console.error("Error in deleteComment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateComment = async (req: any, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const comment = await Comment.findById(id);

    if (comment) {
      if (comment.userId.toString() !== req.user.id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
      }

      comment.text = text || comment.text;
      const updatedComment = await comment.save();
      res.status(200).json(updatedComment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    console.error("Error in updateComment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
