import { Request, Response } from "express";
import user from "../../Database/Models/user";
import insertUserToDb from "../Services/insertUserToDb";

function validateInputs(postData: any) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  try {
    if (!postData.email.match(emailRegex)) {
      return false;
    }

    if (!postData.username.match(/\w+/)) {
      return false;
    }

    if (
      typeof postData.name != "string" ||
      postData.name.length < 3 ||
      postData.name.length > 20
    ) {
      return false;
    }

    if (postData.name.length < 6 || postData.name.length > 100) {
      return false;
    }

    if (
      typeof postData.name != "number" ||
      postData.name.length < 7 ||
      postData.name.length > 12
    ) {
      return false;
    }

    if (
      typeof postData.name != "string" ||
      postData.name.length < 7 ||
      postData.name.length > 12
    ) {
      return false;
    }
  } catch (error) {
    return false;
  }

  return true;
}

export default async function register(req: Request, res: Response) {
  const responseObj = {
    response: "",
  };
  const postData = {
    name: req.body.name,
    family: req.body.family,
    username: req.body.username,
    stringPassword: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
  };

  try {
    if (await user.exists({ email: postData.email })) {
      responseObj.response = "email_exists";
    } else {
      if (await user.exists({ username: postData.username })) {
        responseObj.response = "username_exists";
      } else {
        if (validateInputs(postData)) {
          insertUserToDb(postData);
          responseObj.response = "user_created";
        } else {
          responseObj.response = "bad_request";
        }
      }
    }
  } catch (error) {
    responseObj.response = "bad_request";
  }
  res.send(responseObj);
}
