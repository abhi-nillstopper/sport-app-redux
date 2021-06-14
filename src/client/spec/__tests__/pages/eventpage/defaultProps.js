export const defaultProps = {
  history: {
    length: 18,
    action: "PUSH",
    location: '{hash: "", key: "ro2pzi", pathname: "/events", sear…}',
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
    pathname: "/events",
    search: "",
    hash: "",
    state: null,
    key: "ro2pzi",
  },
  match: {
    path: "/events",
    url: "/events",
    isExact: true,
    params: "{}",
  },
};

const fileContents = 'file contents';
export const fileAsInput = new Blob([fileContents], {type : 'text/plain'});
