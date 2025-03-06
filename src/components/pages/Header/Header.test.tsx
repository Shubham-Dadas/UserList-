import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

jest.mock("../../../services/service", () => ({
  addUser: jest.fn(),
}));

import Header from "./Header";
import { addUser } from "../../../services/service";
import Notification from "../Notification/Notification";

const props = {
  handleUserAdd: jest.fn(),
};

describe("Test Header Component", () => {
  it("Snapshot test", () => {
    const component = mount(<Header {...props} />);
    //@ts-ignore
    expect(toJson(component)).toMatchSnapshot();
  });

  it("Test to check modal is closed initially", () => {
    const component = mount(<Header {...props} />);
    //@ts-ignore
    expect(component.find("AddUser").exists()).toBe(false);
  });

  it("Test to check modal opens on click and closes after successful user addition", () => {
    const promise = Promise.resolve(201);
    (addUser as jest.Mock).mockReturnValue(promise);

    const component = mount(<Header {...props} />);

    component.find(".add-user-btn").simulate("click");

    component.update();

    expect(component.find("AddUser").exists()).toBe(true);

    component.find("form").simulate("submit", { preventDefault: jest.fn() });

    return promise.then(() => {
      component.update();

      expect(component.find("AddUser").exists()).toBe(false);

      expect(component.find(Notification).props().message).toEqual(
        "User added successfully"
      );
      expect(props.handleUserAdd).toHaveBeenCalledTimes(1);
    });
  });
});
