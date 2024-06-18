import { Request, Response } from "express";
import Comment from "../models/commentModel";
import { ServiceNames, fetchFromService } from "../utils/fetchFromService";

export const commentOnDiscussion = async (req: any, res: Response) => {
  const { discussionId, text } = req.body;
  console.log({ discussionId, text });
  try {
    const comment = new Comment({
      user: req.user.id,
      discussion: discussionId,
      text,
    });

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
        userId.toString() !== comment.user.toString()
          ? [...(comment.likes || []), userId]
          : comment.likes;

      await comment.save();
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const replyToComment = async (req: any, res: Response) => {
  const { commentId, text } = req.body;

  try {
    const reply = new Comment({
      user: req.user.id,
      discussion: req.body.discussionId,
      text,
    });

    await reply.save();

    const comment = await Comment.findById(commentId);
    if (comment) {
      comment.replies.push(reply._id);
      await comment.save();
    }

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req: any, res: Response) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);

    if (comment) {
      if (comment.user.toString() !== req.user.id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
      }

      await Comment.deleteOne({ _id: id });
      res.status(200).json({ message: "Comment removed" });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateComment = async (req: any, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const comment = await Comment.findById(id);

    if (comment) {
      if (comment.user.toString() !== req.user.id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
      }

      comment.text = text || comment.text;
      const updatedComment = await comment.save();
      res.status(200).json(updatedComment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
