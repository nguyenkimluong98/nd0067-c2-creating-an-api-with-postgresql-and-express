import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import verifyAuthToken from "../helpers/verifyAuthToken";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
	const users = await store.index();
	res.json(users);
};

const show = async (req: Request, res: Response) => {
	const user = await store.show(req.params.id);
	res.json(user);
};

const create = async (req: Request, res: Response) => {
	const { firstname, lastname, username, password } = req.body;

	try {
		const user: User = {
			firstname,
			lastname,
			username,
			password,
		};

		const newUser = await store.create(user);

		const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET!);

		res.json({ user: newUser, token });
	} catch (err) {
		console.log(err);

		res.status(400);
		res.json(err);
	}
};

const authenticate = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const user = await store.authenticate(username, password);

		const token = jwt.sign({ user }, process.env.TOKEN_SECRET!);

		res.json({ user, token });
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const userRoutes = (app: express.Application) => {
	app.post("/authenticate", authenticate);
	app.get("/users", verifyAuthToken, index);
	app.get("/users/:id", verifyAuthToken, show);
	app.post("/users", create);
};

export default userRoutes;
