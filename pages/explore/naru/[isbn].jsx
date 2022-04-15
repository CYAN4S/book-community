import { Button, Divider, Header, List } from "semantic-ui-react";
import { Image, Segment } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { decode } from "he";
import Head from "next/head";

export default function Title({data, data2}) {

  const libName = data.response.libs.map((lib)=>lib.lib.libName);
  const loanData = data2.response.result;
  console.log(loanData);
  return (
    <>
      <div className="wrap">
        <Header>보유 도서관</Header>
        <div>
          <List>
            <List.Item>{libName.map((item)=><div className="libName" key = {item}>{item}</div>)}</List.Item>
          </List>
        </div>
        <div style={{marginTop : 30}}>
          <List>
            <List.Item>
              {data.response.libs[0].lib.libName}
            </List.Item>
            <List.Item style={{fontSize: 10}}>소장여부 : {loanData.hasBook}</List.Item>
            <List.Item style={{fontSize: 10}}>대출가능여부 : {loanData.loanAvailable}</List.Item>
          </List>
        </div>
        
        <div>

        </div>
      </div>

      <style jsx>{`
        .wrap {
          text-align: center;
          margin: 30px 10px 20px 10px;
        }
        
        .libName{
          margin-top : 10px;
          margin-bottom : 10px;
          font-size : 12px;
        }

      `}</style>
    </>
  );
}

export async function getServerSideProps(props) {
  const isbn = props.params.isbn.split(" ")[1];
  const region = "370200"; // 경기도. 

  const res = await fetch(
    "http://data4library.kr/api/libSrchByBook?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d" +
      "&isbn=" +
      isbn +
      "&region=31" +
      "&format=json"
  ); // 보유도서관 검색
  let data = await res.json();
  const libCode = data.response.libs.map((lib)=>lib.lib.libCode);
  console.log(libCode); //code

  const res2 = await fetch(
    `http://data4library.kr/api/bookExist?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d&libCode=${libCode[1]}
    &isbn13=${isbn}&format=json`
  ); // 소장여부, 대출가능여부
  let data2 = await res2.json();
  // console.log(data.response.libs[0].lib.libName, data2.response.result.loanAvailable);
  // console.log(data.response.libs.map((lib)=>lib.lib.libName));
  return {
    props: {
      data : data,
      data2 : data2,

    },
  };
}
