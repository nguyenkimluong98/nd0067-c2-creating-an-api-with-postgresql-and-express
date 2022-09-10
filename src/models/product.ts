// @ts-ignore
import Client from "../database";

export type Product = {
	id?: number;
	name: string;
	price: number;
};

export class ProductStore {
	async index(): Promise<Product[]> {
		// @ts-ignore
		const conn = await Client.connect();
		try {
			const sql = "SELECT * FROM products";
			const result = await conn.query(sql);

			return result.rows;
		} catch (error) {
			throw new Error(`Cannot get products ${error}`);
		} finally {
			conn.release();
		}
	}

	async show(id: string): Promise<Product> {
		// @ts-ignore
		const conn = await Client.connect();
		try {
			const sql = "SELECT * FROM products WHERE id=($1)";

			const result = await conn.query(sql, [id]);

			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find product ${id}. Error: ${err}`);
		} finally {
			conn.release();
		}
	}

	async create(product: Product): Promise<Product> {
		// @ts-ignore
		const conn = await Client.connect();
		try {
			const sql =
				"INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";

			const result = await conn.query(sql, [product.name, product.price]);

			const newProduct = result.rows[0];

			return newProduct;
		} catch (err) {
			throw new Error(
				`Could not add new product ${product.name}. Error: ${err}`
			);
		} finally {
			conn.release();
		}
	}
}
