type LoginResponseType = {
  authenticated: boolean;
  emailConfirmation?: boolean;
  userId?: string;
  acceccToken?: string;
};

export default LoginResponseType;
