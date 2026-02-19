import express from "express";
import {
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
} from "../controllers/watchlistcontroller.js";
import { authMiddleware } from "../middleware/authmiddleware.js";
import { validateRequest } from "../middleware/validate.js";
import { addToWatchlistSchema } from "../validator/watchlistvalidator.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);

// {{baseUrl}}/watchlist/:id
router.put("/:id", updateWatchlistItem);

// {{baseUrl}}/watchlist/:id
router.delete("/:id", removeFromWatchlist);

export default router;