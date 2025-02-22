import { getUsers } from "./service";

const axios = require("axios");
const AxiosMockAdapter = require("axios-mock-adapter");
const mock = new AxiosMockAdapter(axios);

jest.mock("./service", () => ({
  getUsers: jest.fn(),
}));

const users = [
  {
    id: 7705369,
    name: "Shubham Dadas",
    email: "shubham.dadas@15ce.com",
    gender: "male",
    status: "active",
  },
  {
    id: 7704657,
    name: "Bankim Nambeesan",
    email: "nambeesan_bankim@waelchi.example",
    gender: "male",
    status: "active",
  },
  {
    id: 7704656,
    name: "Chaturaanan Malik",
    email: "chaturaanan_malik@wilkinson.example",
    gender: "female",
    status: "inactive",
  },
];


const promise = Promise.resolve(users);
 
  beforeEach(() => {
      jest.clearAllMocks(); 
      (getUsers as jest.Mock).mockReturnValue(promise);
  });

  it("should return the expected users", () => {
      promise.then((data) => {
         expect(data).toEqual(users)
     })
  });

  it("should be called once", async () => {
    await getUsers(1,10);
    expect(getUsers).toHaveBeenCalledTimes(1);
    expect(getUsers).toHaveBeenCalledWith(1, 10);
  });

  it("should return a promise", () => {
    const result =getUsers(1,10);
    expect(result).toBeInstanceOf(Promise);
  });
  
it("should get users", async () => {
  mock.onGet("https://gorest.co.in/public/v2/users", { params: { page:1,per_page:10 } }).reply(200, {
  users
});
  const res = await getUsers(1,10)
  expect(res.data).toEqual(users)
})

 it("should handle API errors gracefully", async () => {
    mock.onGet("https://gorest.co.in/public/v2/users").reply(500);

    try {
      await getUsers(1, 10);
    } catch (error) {
      expect(error).toBeDefined();
    }
 });

 it("should handle unauthorized access (401 error)", async () => {
    mock.onGet("https://gorest.co.in/public/v2/users").reply(401, { message: "Unauthorized" });

    try {
      await getUsers(1, 10);
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data.message).toBe("Unauthorized");
    }
  });
  



