import React from "react";
import TopNavigation from "../../../../component/top_navigation";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import TestRenderer from "react-test-renderer";
// import * as redux from "react-redux";
import { useSelector, useDispatch } from "react-redux";
// import { withHooks } from "jest-react-hooks-shallow";

// const spy = jest.spyOn(redux, "useSelector");
// spy.mockReturnValue({ isLoggedIn: true });

const defaultProps = {
  children: [
    "<Route />",
    "<Route />",
    "<Route />",
    "<Route />",
    "<Route />",
    "<Route />",
  ],
  location: {
    pathname: "/",
    search: "",
    hash: "",
    key: "7bo7ns",
  },
  computedMatch: {
    path: "/",
    url: "/",
    params: "{}",
    isExact: true,
  },
};

test.only("test", () => {
  let out = true;
  expect(true).toBe(out);
});

const mockDispatch = jest.fn();
useDispatch.mockImplementation(() => mockDispatch);

describe("navigation bar test", () => {
  beforeAll(() => {
    useSelector.mockImplementation(() => ({
      authentication: {
        isLoggedIn: false,
      },
    }));
  });
  //   beforeEach(() => {});

  //   afterEach(() => {});

  test("navigation snapshot", () => {
    // withHooks(() => {
      const component = TestRenderer.create(
        <Router>
          <TopNavigation {...defaultProps} />
        </Router>
      );
      expect(component.toJSON()).toMatchSnapshot();
    // });
  });

  it("navigation shallow test", () => {
    // withHooks(() => {
      const wrapper = mount(
        <Router>
          <TopNavigation {...defaultProps} />
        </Router>
      );

      console.log(wrapper);
      expect(wrapper.props().isExact).toBe(true);
    // });
  });
});
