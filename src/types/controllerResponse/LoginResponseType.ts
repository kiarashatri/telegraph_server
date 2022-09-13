import UserLoginDataDbResponseType from "../databaseResponse/UserLoginDataDbResponseType";

type LoginResponseType = UserLoginDataDbResponseType & {
  authenticated: string;
  accecc_token?: string;
};

export default LoginResponseType;
