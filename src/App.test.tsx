import React from "react";
import toJson from "enzyme-to-json"
import {shallow,mount} from "enzyme";
// import { render, screen } from '@testing-library/react';
import App from "./App";


// test('renders learn react link', () => {
//   // render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("App component", () => {
  it("test component", () => {
    const component = mount(<App />);
    // console.log(component.debug());
    // @ts-ignore
    expect(toJson(component)).toMatchSnapshot();
    expect(1+2).toBe(3)
  });
});
