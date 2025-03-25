import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

import Header from "./Header";

const props = {
  toggleAddUserModal: jest.fn(),
};

describe("Test Header Component", () => {
  it("Snapshot test", () => {
    const component = mount(<Header {...props} />);
    //@ts-ignore
    expect(toJson(component)).toMatchSnapshot();
  });

  it("Test to check modal opens on click and closes after successful user addition", () => {
    const component = mount(<Header {...props} />);

    component.find(".add-user-btn").simulate("click");
    expect(props.toggleAddUserModal).toHaveBeenCalledTimes(1);
  });
});
