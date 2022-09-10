import { UserStore } from "../user";

const store = new UserStore();

describe("User Model", () => {
	it("should have an index method", () => {
		expect(store.index).toBeDefined();
	});

	it("index method should return a list of users", async () => {
		await store.create({
			firstname: "test",
			lastname: "user",
			username: "test_user",
			password: "password123",
		});
		const result = await store.index();
		expect(result.length).not.toEqual(0);
	});

	it("create method should return an user", async () => {
		const result = await store.create({
			firstname: "test",
			lastname: "user",
			username: "test_user",
			password: "password123",
		});
		expect(result.username).toEqual("test_user");
	});

	it("show method should return an user", async () => {
		const showResult = await store.show("1");
		expect(showResult.username).toEqual("test_user");
	});
});
