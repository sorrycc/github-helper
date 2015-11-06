
export default {

  PullRequestReviewCommentEvent: data => data.payload.comment.html_url,
  IssueCommentEvent: data => data.payload.comment.html_url,
  IssuesEvent: data => data.payload.issue.html_url,
  PullRequestEvent: data => data.payload.pull_request.html_url,
  ForkEvent: data => data.payload.forkee.html_url,

  PushEvent: (data) => {
    const { head, before } = data.payload;
    return `https://github.com/ant-design/ant-design/compare/${before.slice(0,10)}...${head.slice(0,10)}`;
  },
};
