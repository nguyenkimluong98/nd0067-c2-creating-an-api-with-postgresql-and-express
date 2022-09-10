import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authorizationHeader = req.headers.authorization;
		const token = authorizationHeader?.split(" ")[1];

		if (token) {
			jwt.verify(token, process.env.TOKEN_SECRET!);

			next();
			return;
		}
	} catch (error) {
		console.log("Invalid token: " + error);
	}

	res.status(401);
	res.json({ message: "Invalid token" });
};

export default verifyAuthToken;
