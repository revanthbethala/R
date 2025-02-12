import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    const { userId,fullName, email, profilePic, isSignedIn } = req.body;
    let user = await User.findOne({ userId });

    if (user) {
      user.fullName = fullName;
      user.email = email;
      user.profilePic = profilePic;
      user.isSignedIn = isSignedIn;
    } else {
      user = new User({ userId, fullName, email, profilePic, isSignedIn });
    }

    await user.save();
    res.status(200).json({ message: "User synced successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error syncing user", error: error.message });
  }
};
