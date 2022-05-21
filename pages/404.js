import { Icon, Button } from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";
// 오류 페이지
const Error404 = () => {
  const router = useRouter();
  const [pageBack, setPageBack] = useState(false);
  const onPageBack = async (event) => {
    setPageBack(true);
  };
  return (
    <>
      <div
        style={{ padding: "20px 0", textAlign: "center", fontSize: "35px" }}
      >
        <Icon name="warning circle" color="red" /> 404 error
        <Icon name="warning circle" color="red" />{" "}
      </div>
      <div style={{ padding: "20px 0", textAlign: "center", fontSize: "35px" }}>
        <Button onClick={onPageBack} color="black">
          돌아가기
        </Button>
        {pageBack && router.back()}
      </div >
    </>
  );
};

export default Error404;
