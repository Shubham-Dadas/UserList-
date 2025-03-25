import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { addUser, getUsers, editUser } from "./service";
import { users, mockUser } from "../stub";

const mock = new MockAdapter(axios);

describe("service test", () => {
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

describe("Test AddUser function", () => {
  it("should add a user successfully", (done) => {
    mock.onPost("https://gorest.co.in/public/v2/users").reply(201, {
      id: 7705370,
      ...mockUser,
    });

    addUser(mockUser)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.data.id).toBe(7705369);
        expect(response.data.name).toBe(mockUser.name);
        done();
      })
      .catch((err) => done.fail(err));
  });

  it("should return 422 when email already exists", (done) => {
    mock.onPost("https://gorest.co.in/public/v2/users").reply(422, {
      message: "Email already exists",
    });

    addUser(mockUser)
      .then((response) => {
        expect(response.response.status).toBe(422);
        expect(response.response.data.message).toBe("Email already exists");
        done();
      })
      .catch((err) => done.fail(err));
  });
});

describe("Test EditUser function", () => {
  it("should edit a user successfully", (done) => {
    mock.onPut("https://gorest.co.in/public/v2/users/7705369").reply(200, {
      id: 7705369,
      ...mockUser,
    });

    editUser(mockUser)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(7705369);
        expect(response.data.name).toBe(mockUser.name);
        done();
      })
      .catch((err) => done.fail(err));
  });

  it("should return 422 when user email is already exists", (done) => {
    mock.onPut("https://gorest.co.in/public/v2/users/7705369").reply(422, {
      message: "Email already exists",
    });

    editUser(mockUser)
      .then((response) => {
        expect(response.response.status).toBe(422);
        expect(response.response.data.message).toBe("Email already exists");
        done();
      })
      .catch((err) => done.fail(err));
  });
});
