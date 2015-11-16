
const _mockResult = {
  success: null,
  fail: null
};

const mockFetch = jest.genMockFromModule('../fetch');

function __setSuccessResult(data) {
  _mockResult.success = data;
}

function __setFailResult(data) {
  _mockResult.fail = data;
}

mockFetch.mockImpl(() => {
  return new Promise((resolve, reject) => {
    if (_mockResult.success !== null) {
      resolve(_mockResult.success);
      _mockResult.success = null;
    }
    if (_mockResult.fail !== null) {
      reject(_mockResult.fail);
      _mockResult.fail = null;
    }
  });
});

mockFetch.__setSuccessResult = __setSuccessResult;
mockFetch.__setFailResult = __setFailResult;

export default mockFetch;
