import { Button, Divider, Header, List } from "semantic-ui-react";
import { Image, Segment } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { decode } from "he";
import Head from "next/head";

export default function Title({lib, saveBook}) {
  const libName = lib.response.libs.map((lib)=>lib.lib.libName);
  const loanData = saveBook;
  
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
          {/* <List>
            <List.Item>
              {lib.response.libs[0].lib.libName}
            </List.Item>
            <List.Item style={{fontSize: 10}}>소장여부 : {loanData.hasBook}</List.Item>
            <List.Item style={{fontSize: 10}}>대출가능여부 : {loanData.loanAvailable}</List.Item>
          </List> */}
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

export async function getServerSideProps({params:{params}}) {
  const [book_isbn, id] = params;
  const isbn = book_isbn.split(" ")[1];
  const region = id; 
  const available_Book = []

  const res = await fetch(
    "http://data4library.kr/api/libSrchByBook?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d" +
      "&isbn=" +
      isbn +
      `&region=${region}` +
      "&format=json"
  ); // 보유도서관 검색
  let lib = await res.json();
  const libCode = lib.response.libs.map((lib)=>lib.lib.libCode);

  const res_lib01 = await fetch(
    `http://data4library.kr/api/bookExist?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d&libCode=${libCode[0]}
    &isbn13=${isbn}&format=json`
  ); // 소장여부, 대출가능여부
  let saveBook01 = await res_lib01.json();
  available_Book.push({id:libCode[0], name:lib.response.libs[0].lib.libName, value:saveBook01});

  const res_lib02 = await fetch(
    `http://data4library.kr/api/bookExist?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d&libCode=${libCode[1]}
    &isbn13=${isbn}&format=json`
  ); // 소장여부, 대출가능여부
  let saveBook02 = await res_lib02.json();
  available_Book.push({id:libCode[1], name:lib.response.libs[1].lib.libName, value:saveBook02});

  const res_lib03 = await fetch(
    `http://data4library.kr/api/bookExist?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d&libCode=${libCode[2]}
    &isbn13=${isbn}&format=json`
  ); // 소장여부, 대출가능여부
  let saveBook03 = await res_lib03.json();
  available_Book.push({id:libCode[2], name:lib.response.libs[2].lib.libName, value:saveBook03});

  const res_lib04 = await fetch(
    `http://data4library.kr/api/bookExist?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d&libCode=${libCode[3]}
    &isbn13=${isbn}&format=json`
  ); // 소장여부, 대출가능여부
  let saveBook04 = await res_lib04.json();
  available_Book.push({id:libCode[3], name:lib.response.libs[3].lib.libName, value:saveBook04});

  const res_lib05 = await fetch(
    `http://data4library.kr/api/bookExist?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d&libCode=${libCode[4]}
    &isbn13=${isbn}&format=json`
  ); // 소장여부, 대출가능여부
  let saveBook05 = await res_lib05.json();
  available_Book.push({id:libCode[4], name:lib.response.libs[4].lib.libName, value:saveBook05});

  const res_lib06 = await fetch(
    `http://data4library.kr/api/bookExist?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d&libCode=${libCode[5]}
    &isbn13=${isbn}&format=json`
  ); // 소장여부, 대출가능여부
  let saveBook06 = await res_lib06.json();
  available_Book.push({id:libCode[5], name:lib.response.libs[5].lib.libName, value:saveBook06});

  const res_lib07 = await fetch(
    `http://data4library.kr/api/bookExist?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d&libCode=${libCode[6]}
    &isbn13=${isbn}&format=json`
  ); // 소장여부, 대출가능여부
  let saveBook07 = await res_lib07.json();
  available_Book.push({id:libCode[6], name:lib.response.libs[6].lib.libName, value:saveBook07});

  const res_lib08 = await fetch(
    `http://data4library.kr/api/bookExist?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d&libCode=${libCode[7]}
    &isbn13=${isbn}&format=json`
  ); // 소장여부, 대출가능여부
  let saveBook08 = await res_lib08.json();
  available_Book.push({id:libCode[7], name:lib.response.libs[7].lib.libName, value:saveBook08});

  const res_lib09 = await fetch(
    `http://data4library.kr/api/bookExist?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d&libCode=${libCode[8]}
    &isbn13=${isbn}&format=json`
  ); // 소장여부, 대출가능여부
  let saveBook09 = await res_lib09.json();
  available_Book.push({id:libCode[8], name:lib.response.libs[8].lib.libName, value:saveBook09});

  const res_lib10 = await fetch(
    `http://data4library.kr/api/bookExist?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d&libCode=${libCode[9]}
    &isbn13=${isbn}&format=json`
  ); // 소장여부, 대출가능여부
  let saveBook10 = await res_lib10.json();
  available_Book.push({id:libCode[9], name:lib.response.libs[9].lib.libName, value:saveBook10});

  // console.log(data.response.libs[0].lib.libName, data2.response.result.loanAvailable);
  // console.log(data.response.libs.map((lib)=>lib.lib.libName));
  return {
    props: {
      lib : lib,
      saveBook : available_Book,
    },
  };
}
