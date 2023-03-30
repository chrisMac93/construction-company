import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const users = [
  {
    id: 1,
    email: "christopher.j.mcelwain@gmail.com",
    password: "$2a$12$Fo3fHL4wId6kRWV4now8l.RkZPhD2wB0u7EmoXlx.3Il9u2d4K.82", 
  },
  {
    id: 2,
    email: "martinconstruction0911@gmail.com",
    password: "$2a$12$MslLzbsGNIBkoIMn3srvIeMpDqg0a6p.qMp2fFZRC4zgquSh5K6Om", 
  },
];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}