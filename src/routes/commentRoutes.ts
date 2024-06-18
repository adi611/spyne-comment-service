import express from "express";
import {
  commentOnDiscussion,
  likeComment,
  replyToComment,
  deleteComment,
  updateComment,
} from "../controllers/commentController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/comment", protect, commentOnDiscussion);
router.post("/comment/like", protect, likeComment);
router.post("/comment/reply", protect, replyToComment);
router.delete("/comment/:id", protect, deleteComment);
router.put("/comment/:id", protect, updateComment);

export default router;
