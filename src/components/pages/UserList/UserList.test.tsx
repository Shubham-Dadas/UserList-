import { mount, shallow } from "enzyme";

import React from "react";
import toJson from "enzyme-to-json";

jest.mock("../../../services/service", () => ({
  getUsers: jest.fn(),
  addUser: jest.fn(),
  editUser: jest.fn(),
}));

import { addUser, getUsers, editUser } from "../../../services/service";
import UsersList from "./UserList";
import UserRow from "../UserRow/UserRow";
import { ActionType } from "../../../Model/model";
import { users } from "../../../stub";

describe("UserList component", () => {
  const promise = Promise.resolve({
    data: users,
    headers: { "x-pagination-total": 10 },
  });

  (getUsers as jest.Mock).mockReturnValue(promise);

  it("function call when component mounts", () => {
    const component = mount(<UsersList />);

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

  it("open and close ActionModal when clicked on action button", () => {
    const component = mount(<UsersList />);
    return promise.then(() => {
      // @ts-ignore
      component.update();
      const userRow = component.find(UserRow).at(0);
      userRow.find("button").simulate("click");
      component.update();
      expect(component.find("ActionModal").exists()).toBe(true);
      userRow.find("button").simulate("click");
      component.update();
      expect(component.find("ActionModal").exists()).toBe(false);
    });
  });

  it("check EditModal open when clicked on Edit button", () => {
    const editPromise = Promise.resolve({
      status: 201,
      data: "User edit successfully",
    });

    (editUser as jest.Mock).mockReturnValue(editPromise);
    const component = mount(<UsersList />);
    const handleUserAddOrEditSpy = jest.spyOn(
      component.instance(),
      //@ts-ignore
      "handleUserAddOrEdit"
    );

    return promise.then(() => {
      // @ts-ignore
      component.update();
      const userRow = component.find(UserRow).at(0);
      userRow.find("button").simulate("click");
      component.update();
      const actionModal = component.find("ActionModal");
      actionModal.find("li").at(0).simulate("click");
      component.update();
      const userFormModal = component.find("UserForm");
      expect(userFormModal.exists()).toBe(true);
      expect(userFormModal.prop("modalState")).toEqual({
        type: ActionType.edit,
        user: users[0],
      });
      expect(component.find("ActionModal").exists()).toBe(false);

      userFormModal
        .find("form")
        .simulate("submit", { preventDefault: jest.fn() });
      return editUser(users[0]).then(() => {
        expect(handleUserAddOrEditSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  it("displays error message when fetching users fails", () => {
    (getUsers as jest.Mock).mockRejectedValue(
      new Error("Error in loading users")
    );

    const component = mount(<UsersList />);

    return new Promise((resolve) => {
      setTimeout(() => {
        component.update();

        expect(component.find(".error p").text()).toEqual(
          "Error in loading users"
        );
        //@ts-ignore
        resolve();
      }, 0);
    });
  });

  it("should call getUsers after adding a new user", () => {
    const addPromise = Promise.resolve({
      status: 201,
    });

    (addUser as jest.Mock).mockReturnValue(addPromise);

    const component = mount(<UsersList />);

    return promise.then(() => {
      component.update();

      component.find(".add-user-btn").simulate("click");
      component.update();

      expect(component.find("UserForm").exists()).toBe(true);

      component
        .find("UserForm")
        .find("form")
        .simulate("submit", { preventDefault: jest.fn() });

      return addPromise.then(() => {
        component.update();
        expect(getUsers).toHaveBeenCalled();
      });
    });
  });
});
