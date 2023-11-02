import { request } from "./auth_controller.test";

let token: string;

beforeEach(async () => {
    const user = {
        email: "johndoe@gmail.com",
        password: "123456",
    }
    const response = await request.post("/api/v1/auth/login").send(user);
    token = response.body.data.token;
}, 10000);



describe("Test the get all users path", () => {
    test("It should response the GET method", async () => {
        const response = await request.get("/api/v1/users");
        expect(response.status).toBe(200);
    }, 10000);
});

describe("Test the get all users path", () => {
    test("It should return all posts by a user", async () => {
        const response = await request.get("/api/v1/users/1/news");
        expect(response.status).toBe(200);
    }, 10000);
});

describe("Test to create a new post", () => {
    test("It should response the create post method", async () => {
        const news = {
            title: "Jest Test",
            content: "Ipsum",
        };
        const response = (await request.post("/api/v1/news").send(news).set("Authorization", `Bearer ${token}`));
        expect(response.status).toBe(200);
        expect(response.body.data.news).toHaveProperty("id");
        expect(response.body.data.news).toHaveProperty("title");
        expect(response.body.data.news).toHaveProperty("body");
        expect(response.body.data.news).toHaveProperty("userId");

    }, 10000);
});
