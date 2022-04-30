import { Button, Divider, Header, Icon, IconGroup, List, Table } from "semantic-ui-react";
import { Image, Segment } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { decode } from "he";
import Head from "next/head";
import { v4 } from "uuid";
import { useState } from "react";
import Entire from "../kakao_map/entire";


export default function Lib({ infoData }) {

  const [entire, setEntire] = useState(false);
  const onClick = () =>{
    setEntire(prev => !prev);
  }

  return (
    <>
      <div className="wrap">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: 300 }}>
                도서관 이름
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: 100 }}>
                소장 여부
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: 100 }}>
                대출 가능 여부
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: 100 }}>
                도서관 위치 확인하기
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {infoData.map((data) => {
              return (
                <Table.Row key={data.name}>
                  <Table.Cell>{data.name}</Table.Cell>
                  {data.value.response.result.hasBook === "Y" ? (
                    <Table.Cell positive>O</Table.Cell>
                  ) : (
                    <Table.Cell negative>X</Table.Cell>
                  )}
                  {data.value.response.result.loanAvailable === "Y" ? (
                    <Table.Cell positive>O</Table.Cell>
                  ) : (
                    <Table.Cell negative>X</Table.Cell>
                  )}
                  <Table.Cell>
                    <Link
                      href={`../kakao_map/${data.latitude}/${data.longitude}/${data.name}`}
                    >
                      <a>
                        <Header as="h5">위치 확인하기</Header>
                      </a>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>

        <Divider style={{ marginTop: 30 }} inverted />
        <Header as="h2" color="blue">
          전체 위치 확인하기
        </Header>
        {entire ? (
          <>
            <Entire infoData = {infoData}/>
            <div className="toggleEntireMap" onClick={onClick}>
              <Icon name="angle double up"></Icon>
            </div>
          </>
        ) : (
          <>
            <div className="toggleEntireMap" onClick={onClick}>
              <Icon name="angle double down"></Icon>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .wrap {
          text-align: center;
          margin: 30px 10px 20px 10px;
        }

        .libName {
          margin-top: 10px;
          margin-bottom: 10px;
          font-size: 12px;
        }

        .toggleEntireMap {
          text-align: center;
          font-size: 20px;
          padding: 10px;
          background-color: white;
          color: black;
          border: 3px solid black;
          border-radius: 30px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 400ms;
        }

        .toggleEntireMaps {
          outline: none; /*버튼이 포커스되었을때 아웃라인이 생기는것을 없애줌*/
        }

        .toggleEntireMap:hover {
          background-color: black;
          color: white;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps({ params: { params } }) {
  const [book_isbn, id] = params;
  const isbn = book_isbn.split(" ")[1];
  const region = id;
  const infoData = [];

  const res = await fetch(
    `http://data4library.kr/api/libSrchByBook?authKey=${process.env.NEXT_PUBLIC_NARU_AUTHKEY}` +
      "&isbn=" +
      isbn +
      `&region=${region}` +
      "&format=json"
  ); // 보유도서관 검색
  let lib = await res.json();
  const libCode = lib.response.libs.map((lib) => lib.lib.libCode);

  if (libCode.length) {
    for (let i = 0; i < libCode.length; i = i + 1) {
      const res = await fetch(
        `http://data4library.kr/api/bookExist?authKey=${process.env.NEXT_PUBLIC_NARU_AUTHKEY}&libCode=${libCode[i]}
          &isbn13=${isbn}&format=json`
      );

      let saveBook = await res.json();
      infoData.push({
        id: libCode[i],
        name: lib.response.libs[i].lib.libName,
        latitude : lib.response.libs[i].lib.latitude,
        longitude : lib.response.libs[i].lib.longitude,
        value: saveBook,
      });
    }
  }

  return {
    props: {
      infoData: infoData,
    },
  };
}
