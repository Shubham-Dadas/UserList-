import { getUsers } from "./service";

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
    await getUsers();
    expect(getUsers).toHaveBeenCalledTimes(1);
  });

  it("should be called twice", async () => {
    await getUsers();
    await getUsers();
    expect(getUsers).toHaveBeenCalledTimes(2);
  });

  it("should be called with no arguments", async () => {
    await getUsers();
    expect(getUsers).toHaveBeenCalledWith();
  });

  it("should return a promise", () => {
    const result =getUsers();
    expect(result).toBeInstanceOf(Promise);
  });
