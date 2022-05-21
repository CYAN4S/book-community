import {
  Button,
  Divider,
  Embed,
  Form,
  Icon,
  Input,
  Item,
} from "semantic-ui-react";
import React from "react";
import Link from "next/link";
import { useState } from "react";

export default function TestVideo() {
  const [input, setInput] = useState(false);
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");
  const onSubmit = () => {

    // 현재, short영상과 일반 영상만 지원됨.
    
    if(url.includes("watch?v=")){
      let pos = url.indexOf("watch?v=");
      // console.log(url.substring(pos+8,));
      setId(url.substring(pos + 8));
      setInput(true);
    }else if(url.includes("/shorts/")){
      let pos = url.indexOf("/shorts/");
      // console.log(url.substring(pos+8,));
      setId(url.substring(pos + 8));
      setInput(true);
    }else{
      setId("");
      setUrl("");
      setInput(false);
      alert("인식할 수 없는 URL입니다.");
    }
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Form.Input
            focus
            placeholder="Youtube URL을 입력해주세요"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
      {input && (
        <>
          <Embed id={id} source="youtube" />
        </>
      )}
    </>
  );
}
