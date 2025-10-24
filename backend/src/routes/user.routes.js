import express from "express"
const router = express.Router()
import { updateEmail, updatePassword, deactivateAccount, resetAccount } from "../controllers/user.controller.js"
import { protect } from "../middleware/auth.middleware.js"
import { accountUpdateLimiter } from "../middleware/rateLimit.middleware.js"

router.use(accountUpdateLimiter)
router.use(protect)

// === Account Updates ==== \\

/**
 * @desc    Update email
 * @route   PATCH /api/user/email
 * @access  PRIVATE
 */
router.patch("/email", updateEmail)

/**
 * @desc    Update user password
 * @route   PATCH /api/user/password
 * @access  PRIVATE
 */
router.patch("/password", updatePassword)

// === Account Reset / Deletion ==== \\

/**
 * @desc    Reset account (delete all tracklists)
 * @route   DELETE /api/user/tracklists
 * @access  PRIVATE
 */
router.delete("/tracklists", resetAccount)


/**
 * @desc    Deactivate user account
 * @route   DELETE /api/user
 * @access  PRIVATE
 */
router.delete("/", deactivateAccount)


export default router;