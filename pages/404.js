import { Icon } from "semantic-ui-react";

// 오류 페이지
const Error404 = () => {
  return (
    <div style={{ padding: "200px 0", textAlign: "center", fontSize: "35px" }}>
      <Icon name="warning circle" color="red" /> 404 error
    </div>
  );
};

export default Error404;
