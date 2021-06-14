export const defaultProps = {
  history: {
    length: 14,
    action: "PUSH",
    location: '{hash: "", key: "u2qive", pathname: "/", search: ""…}',
    createHref: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    go: jest.fn(),
    goBack: jest.fn(),
    goForward: jest.fn(),
    block: jest.fn(),
    listen: jest.fn(),
  },
  location: {
    pathname: "/",
    search: "",
    hash: "",
    key: "u2qive",
  },
  match: {
    path: "/",
    url: "/",
    isExact: true,
    params: "{}",
  },
};
