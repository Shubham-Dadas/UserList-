import React from "react";
import { shallow } from "enzyme";
import UserRow from "./UserRow";
import { mockUser } from "../../../stub";

const mockEditModal = jest.fn();
const mockToggleActionModal = jest.fn();

describe("Testing UserRow Component", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <UserRow
        user={mockUser}
        selectedUser={null}
        toggleActionModal={mockToggleActionModal}
        handleEditModal={mockEditModal}
      />
    );
  });

  it("Snapshot matching testcase", () => {
    //@ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("Testcase to render ActionModal when selectedUser is mockUser", () => {
    component.setProps({ selectedUser: mockUser });
    expect(component.find("ActionModal").exists()).toBe(true);
    expect(component.find("ActionModal").prop("user")).toEqual(mockUser);
  });

  it("calls toggleActionModal when button is clicked", () => {
    component.find("button").simulate("click");
    expect(mockToggleActionModal).toHaveBeenCalledWith(mockUser);
    component.setProps({ selectedUser: null });
    expect(component.find("ActionModal").exists()).toBe(false);
  });
});
