import { Request, Response } from "express";
import user from "../../database/models/user";
import RegisterResponseType from "../../types/controllerResponse/RegisterResponseType";
import NewUserInputType from "../../types/NewUserInputType";
import insertUserToDb from "../services/insertUserToDb";

function validateInputs(postData: NewUserInputType): boolean {
  const emailRegex: RegExp =
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

    const nameLengthAndTypeCondition: boolean =
      postData.name.length < 7 || postData.name.length > 12;
    if (nameLengthAndTypeCondition || typeof postData.name != "number") {
      return false;
    }

    if (nameLengthAndTypeCondition || typeof postData.name != "string") {
      return false;
    }
  } catch (error) {
    console.error(
      `Error in Validator: request/controller/register => validateInputs`,
      `Error: ${error}`
    );
    return false;
  }

  return true;
}

export default async function register(
  req: Request,
  res: Response<RegisterResponseType>
): Promise<void> {
  const responseObj: RegisterResponseType = {
    response: "",
  };

  try {
    const postData: NewUserInputType = {
      name: req.body.name,
      family: req.body.family,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phone: Number(req.body.phone),
    };
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
    console.error(
      `Error in controller: request/controller/register`,
      `Request: ${req}`,
      `Response: ${res}`,
      `Error: ${error}`
    );
    responseObj.response = "bad_request";
  }
  res.send(responseObj);
}
