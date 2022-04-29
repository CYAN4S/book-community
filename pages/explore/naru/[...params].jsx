import { Button, Divider, Header, Icon, List, Table } from "semantic-ui-react";
import { Image, Segment } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { decode } from "he";
import Head from "next/head";
import { v4 } from "uuid";

export default function Lib({ infoData }) {
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
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {infoData.map((data) => {
              return (
                <Table.Row key={v4()}>
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
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
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
    "http://data4library.kr/api/libSrchByBook?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d" +
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
        `http://data4library.kr/api/bookExist?authKey=8f244a56311ab46d397c395a1b1779663c53949135523c3c1bd16cf056ff8e5d&libCode=${libCode[i]}
          &isbn13=${isbn}&format=json`
      );

      let saveBook = await res.json();
      infoData.push({
        id: libCode[i],
        name: lib.response.libs[i].lib.libName,
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
