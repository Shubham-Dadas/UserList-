import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
jest.mock("../../../services/service", () => ({
  editUser: jest.fn(),
}));

import EditUser from "./EditModal";
import { Gender, Status } from "../UserList/model";
import { editUser } from "../../../services/service";

const mockHandleUserEdit = jest.fn();
const mockHandleNotification = jest.fn();
const mockOnclose = jest.fn();
const mockUser = {
  id: 1,
  name: "Shubham Dadas",
  email: "shubh@gmail.com",
  gender: Gender.male,
  status: Status.active,
};

const props = {
  user: mockUser,
  onClose: mockOnclose,
  handleUserEdit: mockHandleUserEdit,
  handleNotification: mockHandleNotification,
};

const state = {
  user: mockUser,
};
describe("Test EditUser Component", () => {
  let component;
  beforeEach(() => {
    component = shallow(<EditUser {...props} />);
  });
  it("Snapshot test", () => {
    //@ts-ignore
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should render correctly with given props", () => {
    expect(component.find("input[name='name']").prop("value")).toEqual(
      mockUser.name
    );
    expect(component.find("input[name='email']").prop("value")).toEqual(
      mockUser.email
    );
    expect(
      component.find("input[name='gender'][value='male']").prop("checked")
    ).toBe(true);
    expect(
      component.find("input[name='status'][value='active']").prop("checked")
    ).toBe(true);
  });

  it("should call onClose when close or cancel button is clicked", () => {
    component.find(".close-btn").simulate("click");
    expect(mockOnclose).toHaveBeenCalled();
    component.find(".cancel-btn").simulate("click");
    expect(mockOnclose).toHaveBeenCalled();
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
      expect(mockHandleUserEdit).toHaveBeenCalled();
      expect(mockHandleNotification).toHaveBeenCalledWith(
        "User updated successfully",
        "success"
      );
      expect(mockOnclose).toHaveBeenCalled();
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
      expect(mockHandleNotification).toHaveBeenCalledWith(
        "email is already taken",
        "error"
      );
    });
  });
});
