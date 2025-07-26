import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/*
  Register Algorithm:

  1. Check if a user already exists by email.
  2. If true, return an error message: "User already exists".
  3. If false, create the user in the database and return success with user info.
*/

export async function register({ firstName, lastName, email, password }) {
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return { message: "User already exists!", status: 400 };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return {
      message: "User created successfully",
      status: 201,
      data: generateJWT({ firstName, lastName, email }),
    };
  } catch (error) {
    return {
      message: "Internal server error",
      status: 500,
      error: error.message,
    };
  }
}

/*
  Login Algorithm:

  1. Check if a user exists using the provided email.
  2. If the user exists, return a response indicating that the user exists.
  3. If the user does not exist, return a response indicating that the user was not found.
*/

export async function logIn({ email, password }) {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return {
        message: "User email not found",
        status: 400,
      };
    }
    console.log("pass from user", password);
    console.log("pass from database", user.password);
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        message: "Invalid password",
        status: 400,
      };
    } else {
      return {
        message: "Login successful",
        status: 200,
        data: generateJWT({
          lastName: user.firstName,
          lastNmae: user.lastName,
          email,
        }),
      };
    }
  } catch (error) {
    return {
      message: "Internal server error",
      status: 500,
      error: error.message,
    };
  }
}

function generateJWT(data) {
  return jwt.sign(data, "2vKf9ggZQDC1FICHSjVJwBkAukzv9l9S");
}
