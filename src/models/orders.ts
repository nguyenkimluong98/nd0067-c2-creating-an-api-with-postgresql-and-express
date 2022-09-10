// @ts-ignore
import Client from "../database";
import format from "pg-format";

export type Order = {
	id?: number;
	status: string;
	user_id: number;
};

export type OrderProduct = {
	id?: number;
	quantity: number;
	order_id: number;
	product_id: number;
};

export type OrderItem = {
	product_id: number;
	quantity: number;
};

const ACTIVE_STATUS = "ACTIVE";
const COMPLETE_STATUE = "COMPLETE";

export class OrderStore {
	async create(userId: number, products: OrderItem[]): Promise<Order> {
		// @ts-ignore
		const conn = await Client.connect();

		try {
			await conn.query("BEGIN");

			const sqlInsertOrder =
				"INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";

			const resultOrder = await conn.query(sqlInsertOrder, [
				ACTIVE_STATUS,
				userId,
			]);

			const orderId = resultOrder.rows[0].id;

			const orderProductValues = products.map((product) => [
				product.product_id,
				product.quantity,
				orderId,
			]);

			const sqlInsertOrderProduct = format(
				"INSERT INTO order_products (product_id, quantity, order_id) VALUES %L",
				orderProductValues
			);

			await conn.query(sqlInsertOrderProduct);

			await conn.query("COMMIT");

			return resultOrder.rows[0];
		} catch (e) {
			console.log(e);

			await conn.query("ROLLBACK");
			throw e;
		} finally {
			conn.release();
		}
	}

	async completeOrder(orderId: string): Promise<Order> {
		// @ts-ignore
		const conn = await Client.connect();

		try {
			const sql = "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *";

			const result = await conn.query(sql, [COMPLETE_STATUE, orderId]);

			return result.rows[0];
		} catch (error) {
			throw error;
		} finally {
			conn.release();
		}
	}

	async currentOrderByUser(userId: string): Promise<Order[]> {
		// @ts-ignore
		const conn = await Client.connect();

		try {
			const sql = "SELECT * FROM orders WHERE user_id = $1";

			const result = await conn.query(sql, [userId]);

			return result.rows;
		} catch (error) {
			console.log(error);

			throw error;
		} finally {
			conn.release();
		}
	}

	async completeOrderByUser(userId: string): Promise<Order[]> {
		// @ts-ignore
		const conn = await Client.connect();

		try {
			const sql = "SELECT * FROM orders WHERE user_id = $1 AND status = $2";

			const result = await conn.query(sql, [userId, COMPLETE_STATUE]);

			return result.rows;
		} catch (error) {
			throw error;
		} finally {
			conn.release();
		}
	}
}
