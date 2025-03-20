import React from "react";
import { shallow } from "enzyme";
import UserRow from "./UserRow";
import { Gender, Status } from "../UserList/model";

const mockEditModal = jest.fn();
const mockToggleActionModal = jest.fn();

const mockUser = {
  id: 7705369,
  name: "Shubham Dadas",
  email: "shubham.dadas@15ce.com",
  gender: Gender.male,
  status: Status.active,
};

describe("Testing UserRow Component", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <UserRow
        user={mockUser}
        isOpen={false}
        toggleActionModal={mockToggleActionModal}
        handleEditModal={mockEditModal}
      />
    );
  });

  it("Snapshot matching testcase", () => {
    //@ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("Testcase for ActionModal does not render ActionModal initially", () => {
    expect(component.find("ActionModal").exists()).toBe(false);
  });

  it("Testcase to render ActionModal when isOpen is set to true", () => {
    component.setProps({ isOpen: true });
    expect(component.find("ActionModal").exists()).toBe(true);
    expect(component.find("ActionModal").prop("user")).toEqual(mockUser);
  });

  it("calls toggleActionModal when button is clicked", () => {
    component.find("button").simulate("click");
    expect(mockToggleActionModal).toHaveBeenCalledWith(mockUser);
    component.setProps({ isOpen: false });
    expect(component.find("ActionModal").exists()).toBe(false);
  });
});
