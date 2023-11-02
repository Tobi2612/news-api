import supertest from "supertest";
import app from "../../";

export const request = supertest(app);

let server: any;

beforeEach(() => {
    server = app.listen(3000, () => console.log('Listening on port 3000'));
});

afterEach(async () => {
    await server.close();
});

describe("Test the non existent path", () => {
    test("Return 404 for not existent path", async () => {
        const response = await request.get("/lorem-ipsum")
        expect(response.status).toBe(404);
    }, 10000);
});

let userId: string;


describe("Test the sign up path for user", () => {
    test("It should respond to the POST method", async () => {
        const user = {
            name: "Jest Test",
            email: "test@jes1.com",
            password: "test1234"
        };
        const response = await request.post("/api/v1/auth/register").send(user);
        expect(response.status).toBe(201);
        expect(response.body.data.user).toHaveProperty("name");
        expect(response.body.data.user).toHaveProperty("email");
        expect(response.body.data.user).toHaveProperty("id");


        userId = response.body.data.user.id;
    }, 10000);
});

describe("Test the sign in path", () => {
  test("It should respond to the POST method", async () => {
      const user = {
          email: "trevor@gmail.com",
          password: "123456",
      };
      const response = await request.post("/api/v1/auth/login").send(user);
      expect(response.status).toBe(200);
      expect(response.body.data.user).toHaveProperty("name");
      expect(response.body.data.user).toHaveProperty("email");
      expect(response.body.data.user).toHaveProperty("id");

      userId = response.body.data.user.id;
  }, 10000);
});