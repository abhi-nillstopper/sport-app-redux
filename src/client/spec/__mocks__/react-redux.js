// jest.mock('react-redux', () => {
//     const ActualReactRedux = jest.requireActual('react-redux');
//     return {
//         ...ActualReactRedux,
//         useSelector: jest.fn().mockImplementation(() => {
//             return mockState;
//         }),
//     };
// });