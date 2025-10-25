import User from "../models/userModel";

const getUsers = async () => {
  return await User.find();
};

const createUser = async (
  body: { name: string; email: string; password: string },
  status: Function
) => {
  const existentUser = await User.findOne({
    email: body.email,
  });
  if (existentUser) {
    return status(409, {
      error: "User already exists",
      details: "A user with this email address is already registered.",
    });
  }
  const user = new User(body);
  return await user.save();
};

export { getUsers, createUser };
