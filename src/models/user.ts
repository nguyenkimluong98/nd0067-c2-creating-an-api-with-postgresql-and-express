// @ts-ignore
import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
	id?: number;
	firstname: string;
	lastname: string;
	username: string;
	password: string;
};

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export class UserStore {
	async index(): Promise<User[]> {
		// @ts-ignore
		const conn = await Client.connect();
		try {
			const sql = "SELECT * FROM users";
			const result = await conn.query(sql);

			// @ts-ignore
			return result.rows.map((user) => {
				user.password = null;
				return user;
			});
		} catch (error) {
			throw new Error(`Cannot get users ${error}`);
		} finally {
			conn.release();
		}
	}

	async show(id: string): Promise<User> {
		// @ts-ignore
		const conn = await Client.connect();

		try {
			const sql = "SELECT * FROM users WHERE id=($1)";

			const result = await conn.query(sql, [id]);

			const user = result.rows[0];
			user.password = null;

			return user;
		} catch (err) {
			throw new Error(`Could not find user ${id}. Error: ${err}`);
		} finally {
			conn.release();
		}
	}

	async create(user: User): Promise<User> {
		// @ts-ignore
		const conn = await Client.connect();

		try {
			const sql =
				"INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *";

			const hash = bcrypt.hashSync(
				user.password + pepper,
				parseInt(saltRounds!)
			);

			const result = await conn.query(sql, [
				user.firstname,
				user.lastname,
				user.username,
				hash,
			]);

			const newUser = result.rows[0];

			newUser.password = null;

			return newUser;
		} catch (err) {
			throw new Error(
				`Could not add new user ${user.firstname} ${user.lastname}. Error: ${err}`
			);
		} finally {
			conn.release();
		}
	}

	async authenticate(username: string, password: string): Promise<User | null> {
		// @ts-ignore
		const conn = await Client.connect();

		try {
			const sql = "SELECT * FROM users WHERE username=($1)";

			const result = await conn.query(sql, [username]);

			if (result.rows.length) {
				const user = result.rows[0];

				if (bcrypt.compareSync(password + pepper, user.password)) {
					user.password = null;
					return user;
				}
			}
		} catch (error) {
			throw error;
		} finally {
			conn.release();
		}

		return null;
	}
}
