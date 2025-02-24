import Pagination from "./Pagination";
import { mount, shallow } from "enzyme";
import React from "react";
import toJson from "enzyme-to-json";

const mockHandlePageClick = jest.fn();

const props = {
  handlePageClick: mockHandlePageClick,
  pageCount: 5,
  currentPage: 2
};

it("check mounting of pagination component", () => {
    const component = shallow(<Pagination {...props} />);
    // @ts-ignore
    expect(toJson(component)).toMatchSnapshot();
})

it("check disable of prev button for first page", () => {
  const component = shallow(<Pagination {...props} currentPage={0}/>);
  // @ts-ignore
  expect(component.find(".prev").prop("disabled")).toBe(true)
})

it("check disable of next button for last page", () => {
  const component = shallow(<Pagination {...props} currentPage={4} />);
  // @ts-ignore
  expect(component.find(".next").prop("disabled")).toBe(true);
});

it("finding button in component", () => {
    const component = shallow(<Pagination {...props} currentPage={2} />)
    expect(component.find("button").exists()).toBe(true)
})

it("check calling of function", () => { 
    const component = mount(<Pagination {...props} />);
    component.find(".prev").simulate("click");
    expect(mockHandlePageClick).toHaveBeenCalledWith({ selected: 1 });
})
