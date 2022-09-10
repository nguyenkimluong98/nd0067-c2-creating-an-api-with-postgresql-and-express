import { ProductStore } from "../product";

const store = new ProductStore();

describe("Product Model", () => {
	it("should have an index method", () => {
		expect(store.index).toBeDefined();
	});

	it("index method should return a list of products", async () => {
		await store.create({
			name: "Book",
			price: 300,
		});
		const result = await store.index();
		expect(result.length).not.toEqual(0);
	});

	it("create method should return an product", async () => {
		const result = await store.create({
			name: "Book",
			price: 300,
		});
		expect(result.name).toEqual("Book");
	});

	it("show method should return an product", async () => {
		await store.create({
			name: "Book",
			price: 300,
		});
		const showResult = await store.show("1");
		expect(showResult.name).toEqual("Book");
	});
});
