import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

import { getUsers } from "./service";

describe('service test', () => {
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

  const mock = new MockAdapter(axios);

  it("should get users", (done) => {
    mock.onGet("https://gorest.co.in/public/v2/users?page=1&per_page=10").reply(200, users)

    return getUsers(1, 10)
      .then((response) => {
        expect(response.data).toEqual(users);
        done();
      })
      .catch((err) => done.fail(err))
  })
})
  



