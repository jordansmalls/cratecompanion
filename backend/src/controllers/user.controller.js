import User from "../models/user.model.js"
import validator from "validator"

const troubleErr = { message: "We're having trouble, please try again." }


/**
 * @desc    Update email
 * @route   PATCH /api/user/email
 * @access  PRIVATE
 */
export const updateEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    if (!validator.isEmail(email)) {
      return res.status(422).json({ message: "Please enter a valid email." });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === user.email.toLowerCase()) {
      return res.status(400).json({ message: "Please provide a different email address." });
    }

    const emailExists = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: user._id },
    });

    if (emailExists) {
      return res.status(400).json({ message: "Email is already associated with an account." });
    }

    user.email = normalizedEmail;
    const updatedUser = await user.save();

    return res.status(200).json({
      message: "Email updated successfully.",
      user: {
        _id: updatedUser._id,
        email: updatedUser.email,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (err) {
    console.error("Email update error:", err);
    return res.status(500).json({ message: "Error updating email, please try again soon." });
  }
};

/**
 * @desc    Update user password
 * @route   PATCH /api/users/password
 * @access  PRIVATE
 */

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters.",
      });
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check current password
    const isCurrentPasswordValid = await user.matchPassword(currentPassword);

    if (!isCurrentPasswordValid) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }

    // Set new password (will be hashed by pre-save middleware)
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("Password change error:", err);
    return res
      .status(500)
      .json({ message: "Error changing password, please try again soon." });
  }
};


/**
 * @desc    Reset account (delete all tracklists)
 * @route   DELETE /api/user/tracklists
 * @access  PRIVATE
 */

// TODO: implement when tracklist logic is brought into the app later
export const resetAccount = async (req, res) => {
    console.log("Reset account endpoint hit.")
    return res.status(200).json({ message: "You have successfully reset your account!" })
}


/**
 * @desc    Deactivate user account (toggle active prop -> users agree we keep tracklists for analytics)
 * @route   DELETE /api/user
 * @access  PRIVATE
 */

export const deactivateAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if(!user) {
            return res.status(404).json({ message: "Account not found." })
        }

        // Soft delete of account
        user.active = false;
        await user.save()

        // Clear JWT cookie
        res.cookie("jwt", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
        });

        return res.status(200).json({ message: "Account deactivated successfully." })
    } catch (err) {
        console.error("There was an error deleting an account:", err)
        return res.status(500).json({ message: "There was as an error deleting your account, please try again soon." })
    }
}