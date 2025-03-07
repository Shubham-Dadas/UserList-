import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { addUser, getUsers } from "./service";

const mock = new MockAdapter(axios);
describe("service test", () => {
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

  it("should get users", (done) => {
    mock
      .onGet("https://gorest.co.in/public/v2/users?page=1&per_page=10")
      .reply(200, users);

    return getUsers(1, 10)
      .then((response) => {
        expect(response.data).toEqual(users);
        done();
      })
      .catch((err) => done.fail(err));
  });
});

describe("AddUser Test", () => {
  it("should add user", (done) => {
    mock.onPost("https://gorest.co.in/public/v2/users").reply(201, 201);
    return addUser({
      name: "shubham",
      email: "shubh@gmail.com",
      gender: "male",
      status: "active",
    })
      .then((res) => {
        expect(res).toEqual(201);
        done();
      })
      .catch((err) => {
        done.fail(err);
      });
  });

  it("should return 422 when email already exists", (done) => {
    mock.onPost("https://gorest.co.in/public/v2/users").reply(422, 422);
    return addUser({
      name: "shubham",
      email: "shubh@gmail.com",
      gender: "male",
      status: "active",
    })
      .then((res) => {
        expect(res).toEqual(422);
        done();
      })
      .catch((err) => {
        done.fail(err);
      });
  });
});
