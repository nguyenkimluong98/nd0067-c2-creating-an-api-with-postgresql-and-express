import express, { Request, Response } from "express";
import verifyAuthToken from "../helpers/verifyAuthToken";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
	const products = await store.index();
	res.json(products);
};

const show = async (req: Request, res: Response) => {
	const product = await store.show(req.params.id);
	res.json(product);
};

const create = async (req: Request, res: Response) => {
	const { name, price } = req.body;

	try {
		const product: Product = {
			name,
			price,
		};

		const newProduct = await store.create(product);

		res.json(newProduct);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const productRoutes = (app: express.Application) => {
	app.get("/products", index);
	app.get("/products/:id", show);
	app.post("/products", verifyAuthToken, create);
};

export default productRoutes;
