import { OrderStore } from "../orders";

const store = new OrderStore();

describe("Order Model", () => {
	it("currentOrderByUser method should return a list of products", async () => {
		const result = await store.currentOrderByUser("1");
		expect(result).toEqual([]);
	});

	it("completeOrderByUser method should return a list of products", async () => {
		const result = await store.completeOrderByUser("1");
		expect(result).toEqual([]);
	});
});
