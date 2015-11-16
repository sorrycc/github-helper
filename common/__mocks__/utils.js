
const mockResult = jest.genMockFromModule('../utils');

mockResult.openUrl.mockImpl(() => {
});

export default mockResult;
