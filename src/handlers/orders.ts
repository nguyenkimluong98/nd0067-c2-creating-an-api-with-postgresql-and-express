import express, { Request, Response } from "express";
import verifyAuthToken from "../helpers/verifyAuthToken";
import { OrderStore } from "../models/orders";

const store = new OrderStore();

const completeOrder = async (req: Request, res: Response) => {
	try {
		const order = await store.completeOrder(req.params.orderId);
		res.json(order);
	} catch (error) {
		res.status(400);
		res.json(error);
	}
};

const create = async (req: Request, res: Response) => {
	const { products, userId } = req.body;

	try {
		const order = await store.create(userId, products);

		res.json(order);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const currentOrderByUser = async (req: Request, res: Response) => {
	try {
		const orders = await store.currentOrderByUser(req.params.userId);
		res.json(orders);
	} catch (error) {
		res.status(400);
		res.json(error);
	}
};

const completeOrderByUser = async (req: Request, res: Response) => {
	try {
		const orders = await store.completeOrderByUser(req.params.userId);
		res.json(orders);
	} catch (error) {
		res.status(400);
		res.json(error);
	}
};

const orderRoutes = (app: express.Application) => {
	app.post("/orders", verifyAuthToken, create);
	app.put("/orders/:orderId/complete", verifyAuthToken, completeOrder);
	app.get("/orders/user/:userId", verifyAuthToken, currentOrderByUser);
	app.get(
		"/orders/complete/user/:userId",
		verifyAuthToken,
		completeOrderByUser
	);
};

export default orderRoutes;
