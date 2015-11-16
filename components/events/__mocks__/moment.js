
function mockMoment() {
  return {
    fromNow: () => {
      return '5 days ago';
    },
  };
}

export default mockMoment;
