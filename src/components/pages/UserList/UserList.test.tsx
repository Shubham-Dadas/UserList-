import { mount, shallow } from "enzyme";

import React from "react";
import toJson from "enzyme-to-json";

jest.mock("../../../services/service", () => ({
  getUsers: jest.fn(),
}));

import { getUsers } from "../../../services/service";

import UsersList from "./UserList";
import UserRow from "../UserRow/UserRow";

describe("UserList component", () => {
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

  const promise = Promise.resolve({
    data: users,
    headers: { "x-pagination-total": 10 },
  });

  (getUsers as jest.Mock).mockReturnValue(promise);

  it("function call when component mounts", () => {
    const component = shallow(<UsersList />);

    expect(getUsers).toHaveBeenCalled();
    return promise.then(() => {
      component.update();

      // @ts-ignore
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  it("loading users content test", () => {
    const component = mount(<UsersList />);
    return promise.then(() => {
      // @ts-ignore
      expect(component.find("p").text()).toEqual("Loading users...");
    });
  });

  it("userRow render testcase", () => {
    const component = mount(<UsersList />);
    return promise.then(() => {
      // @ts-ignore
      component.update();

      expect(component.find(UserRow).length).toEqual(users.length);

      expect(component.find(UserRow).at(0).props().user).toEqual(users[0]);
    });
  });

  it("displays error message when fetching users fails", () => {
    (getUsers as jest.Mock).mockReturnValue(
      Promise.reject(new Error("Error in fetching users"))
    );

    const component = mount(<UsersList />);

    return new Promise((resolve) => setTimeout(resolve, 0)).then(() => {
      component.update();
      expect(component.find(".error p").text()).toEqual(
        "Error in loading users"
      );
    });
  });
});
