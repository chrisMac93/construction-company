import jwt from "jsonwebtoken";
import cookie from "cookie";

export const isAuthenticated = (req) => {
  let token;

  if (req) {
    const cookies = cookie.parse(req.headers.cookie || "");
    token = cookies.token;
  } else {
    token = localStorage.getItem("token");
  }

  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
};