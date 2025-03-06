import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Notification from "./Notification";

describe("Notification Component", () => {
  it("test to check snapshot when message is provided", () => {
    const component = mount(
      <Notification message="User added successfully" type="success" />
    );
    //@ts-ignore
    expect(toJson(component)).toMatchSnapshot();
    expect(component.find("span").text()).toEqual("User added successfully");
    expect(component.props().message).toEqual("User added successfully");
  });
});
