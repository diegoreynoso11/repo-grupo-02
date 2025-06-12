import { FormatRes } from "./formatRes.js";

export const authMiddleware = (req, res) => {
  const response = new FormatRes(res);

  const token = req.headers.authorization;

  if (!token) {
    response.unauthorized("Forbidden. No token provided.");
    return false;
  }

  const expectedToken = process.env.AUTH_TOKEN || "secret-token";

  if (token !== `Bearer ${expectedToken}`) {
    response.forbidden("Forbidden. Invalid token.");
    return false;
  }

  return true;
};

