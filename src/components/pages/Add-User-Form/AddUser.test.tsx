import React from "react";
import toJson from "enzyme-to-json";
import { mount } from "enzyme";
import AddUser from "./AddUser";
import { addUser } from "../../../services/service";

jest.mock("../../../services/service", () => ({
  addUser: jest.fn(),
}));

const props = {
  onClose: jest.fn(),
  handleUserAdd: jest.fn(),
  handleNotification: jest.fn(),
};

describe("Test AddUser Component", () => {
  it("Snapshot Test", () => {
    const component = mount(<AddUser {...props} />);
    //@ts-ignore
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should call onClose when cancel button is clicked", () => {
    const component = mount(<AddUser {...props} />);
    component.find("button.cancel-btn").simulate("click");
    expect(props.onClose).toHaveBeenCalled();
  });

  it("should handle form submission successfully", () => {
    const promise = Promise.resolve(201);

    (addUser as jest.Mock).mockReturnValue(promise);
    const component = mount(<AddUser {...props} />);
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
        target: { name: "gender", value: "male" },
      });

    component
      .find('input[name="status"]')
      .at(0)
      .simulate("change", {
        target: { name: "status", value: "active" },
      });
    component.update();
    component.find("form").simulate("submit", { preventDefault: jest.fn() });
    expect(addUser).toHaveBeenCalled();
    return promise.then(() => {
      component.update();

      // @ts-ignore
      expect(props.handleUserAdd).toHaveBeenCalledTimes(1);
      expect(props.onClose).toHaveBeenCalled();
      expect(props.handleNotification).toHaveBeenCalled();
      expect(props.handleNotification).toHaveBeenCalledWith(
        "User added successfully",
        "success"
      );

      expect(addUser).toHaveBeenCalledWith(
        "shubham",
        "shubham@gmail.com",
        "male",
        "active"
      );
    });
  });
});
