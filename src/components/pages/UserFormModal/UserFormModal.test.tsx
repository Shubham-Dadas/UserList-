import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { mockUser } from "../../../stub";
import {
  handleModalClose,
  handleNotification,
  handleUserAddOrEdit,
} from "../../../stub";

jest.mock("../../../services/service", () => ({
  editUser: jest.fn(),
  addUser: jest.fn(),
}));

import UserForm from "./UserFormModal";
import { ActionType, Gender, Status } from "../../../Model/model";
import { editUser, addUser } from "../../../services/service";

const Baseprops = {
  onCloseModal: handleModalClose,
  handleUserAddOrEdit: handleUserAddOrEdit,
  handleNotification: handleNotification,
};

describe("Test EditUser Component", () => {
  let component;
  const state = {
    user: mockUser,
  };
  beforeEach(() => {
    const props = {
      ...Baseprops,
      modalState: {
        type: ActionType.edit,
        user: mockUser,
      },
    };
    component = mount(<UserForm {...props} />);
  });

  it("Snapshot test for EditUser modal", () => {
    //@ts-ignore
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should call onClose when close or cancel button is clicked", () => {
    expect(component.find(".close-btn").exists()).toBe(true);
    component.find(".close-btn").simulate("click");
    expect(handleModalClose).toHaveBeenCalled();
    component.find(".cancel-btn").simulate("click");
    expect(handleModalClose).toHaveBeenCalled();
  });

  it("should update state when input fields are changed and successfully submit the form", () => {
    const promise = Promise.resolve({
      status: 201,
    });

    (editUser as jest.Mock).mockReturnValue(promise);

    const newName = "Shubh";
    component.find("input[name='name']").simulate("change", {
      target: { name: "name", value: newName },
    });
    component
      .find("input[name='status'][value='inactive']")
      .simulate("change", {
        target: { name: "status", value: Status.inactive },
      });
    component.update();
    const updatedUser = component.state("user");
    expect(updatedUser.name).toEqual(newName);
    expect(updatedUser.status).toEqual(Status.inactive);
    component.find("form").simulate("submit", { preventDefault: jest.fn() });
    return promise.then(() => {
      expect(editUser).toHaveBeenCalledWith(updatedUser);
      expect(handleUserAddOrEdit).toHaveBeenCalled();
      expect(handleNotification).toHaveBeenCalledWith(
        "User updated successfully",
        "success"
      );
      expect(handleModalClose).toHaveBeenCalled();
    });
  });

  it("should show error notification when form submission returns 422 status", () => {
    const errorResponse = {
      response: {
        status: 422,
        data: [{ field: "email", message: "is already taken" }],
      },
    };

    const promise = Promise.resolve(errorResponse);
    (editUser as jest.Mock).mockReturnValue(promise);

    component.find("form").simulate("submit", { preventDefault: jest.fn() });

    return promise.then(() => {
      expect(editUser).toHaveBeenCalledWith(state.user);
      expect(handleNotification).toHaveBeenCalledWith(
        "email is already taken",
        "error"
      );
    });
  });
});

describe("Test AddUser Component", () => {
  let component;

  beforeEach(() => {
    const props = {
      ...Baseprops,
      modalState: {
        type: ActionType.add,
        user: null,
      },
    };
    component = mount(<UserForm {...props} />);
  });

  it("should handle form submission successfully", () => {
    const promise = Promise.resolve(201);

    (addUser as jest.Mock).mockReturnValue(promise);

    component.find('input[name="name"]').simulate("change", {
      target: { name: "name", value: "shubham" },
    });

    component.find('input[name="email"]').simulate("change", {
      target: { name: "email", value: "shubham@gmail.com" },
    });

    component
      .find('input[name="gender"]')
      .at(0)
      .simulate("change", {
        target: { name: "gender", value: Gender.male },
      });

    component
      .find('input[name="status"]')
      .at(0)
      .simulate("change", {
        target: { name: "status", value: Status.active },
      });
    component.update();
    component.find("form").simulate("submit", { preventDefault: jest.fn() });
    expect(addUser).toHaveBeenCalled();
    return promise.then(() => {
      component.update();

      // @ts-ignore
      expect(Baseprops.handleUserAddOrEdit).toHaveBeenCalled();
      expect(Baseprops.onCloseModal).toHaveBeenCalled();
      expect(Baseprops.handleNotification).toHaveBeenCalledWith(
        "User added successfully",
        "success"
      );

      expect(addUser).toHaveBeenCalledWith({
        name: "shubham",
        email: "shubham@gmail.com",
        gender: Gender.male,
        status: Status.active,
      });
    });
  });
});
