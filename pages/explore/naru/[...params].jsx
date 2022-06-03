import {
  Button,
  Divider,
  Header,
  Icon,
  Table,
} from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Entire from "../../../Components/entire";
import { useEffect } from "react";

export default function Lib({ infoData }) {
  const router = useRouter();
  const [entire, setEntire] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [min, setMin] = useState(999999);

  const onClick = () => {
    setEntire((prev) => !prev);
  };

  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  // 특정 도서관과 현재 내 위치 dict 확인
  function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lng2 - lng1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // position 객체 내부에 timestamp(현재 시간)와 coords 객체
        const time = new Date(position.timestamp);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      }
    );

    // setMin : 지역 내 도서관과 내 위치의 거리를 비교한 후, 제일 작은 위치를 확인
    infoData.map((item) => {
      if (
        min >
        getDistanceFromLatLonInKm(
          latitude,
          longitude,
          item.latitude,
          item.longitude
        )
      ) {
        setMin(
          getDistanceFromLatLonInKm(
            latitude,
            longitude,
            item.latitude,
            item.longitude
          )
        );
      }
    });
  });

  return (
    <>
      <div className="wrap">
        {infoData.length ? (
          <>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ width: 170 }}>
                    도서관 이름
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: 100 }}>
                    연락처
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: 250 }}>
                    주소
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: 50 }}>
                    소장 여부
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: 50 }}>
                    대출 가능 여부
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: 100 }}>
                    내 위치와의 거리
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {infoData.map((data) => {
                  return (
                    <Table.Row key={data.name}>
                      <Table.Cell>
                        <a href={data.homepage} title ="클릭하여 홈페이지로 이동하기">{data.name}</a>
                      </Table.Cell>
                      <Table.Cell>{data.tel}</Table.Cell>
                      <Table.Cell>
                      {data.address}
                        <Link
                          href={`../kakao_map/${data.latitude}/${data.longitude}/${data.name}`}
                        >
                          <a  title ="클릭하여 카카오 맵 펼치기">
                            <Icon name="map marker alternate" style={{marginLeft:5}}/>
                          </a>
                        </Link>
                      </Table.Cell>
                      {/* 소장 및 대출가능 시, O 표시 */}
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
                        {/* min값이면, 두드러지게 표시 */}
                        {min ===
                        getDistanceFromLatLonInKm(
                          latitude,
                          longitude,
                          data.latitude,
                          data.longitude
                        ) ? (
                          <>
                            <Icon name="thumbs up"></Icon>
                            <strong>
                              {getDistanceFromLatLonInKm(
                                latitude,
                                longitude,
                                data.latitude,
                                data.longitude
                              ).toFixed(1)}
                              {`km`}
                            </strong>
                          </>
                        ) : (
                          <>
                            {getDistanceFromLatLonInKm(
                              latitude,
                              longitude,
                              data.latitude,
                              data.longitude
                            ).toFixed(1)}
                            {`km`}
                          </>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </>
        ) : (
          <>
            <div
              style={{
                padding: "200px 0",
                textAlign: "center",
                fontSize: "35px",
              }}
            >
              <Icon name="warning circle" color="red" />{" "}
              <strong>검색결과가 존재하지 않습니다.</strong>
              <p />
            </div>
          </>
        )}

        <Button
          color="black"
          onClick={returnClick}
          style={{ marginTop: 10, marginBottom: 20 }}
        >
          돌아가기
        </Button>

        {/* 해당페이지에 표시된 도서관들의 위치 표시 */}
        {infoData.length !== 0 && (
          <>
            <Divider style={{ marginTop: 30 }} inverted />
            <Header as="h2" color="blue">
              <p style={{fontFamily : "Stylish-Regular"}}>전체 위치 확인하기</p>
            </Header>
            <div>
            {entire ? (
              <>
                <Entire infoData={infoData} />
                <Icon name="arrow alternate circle up" size = "big" onClick={onClick} ></Icon>
                
              </>
            ) : (
              <>
                <Icon name="arrow alternate circle down" size = "big" onClick={onClick}></Icon>
              </>
            )}
            </div>

            
          </>
        )}
      </div>

      <style jsx>{`
        .wrap {
          text-align: center;
          margin: 30px 10px 20px 10px;
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
  console.log(lib.response);
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
        tel: lib.response.libs[i].lib.tel,
        address: lib.response.libs[i].lib.address,
        homepage: lib.response.libs[i].lib.homepage,
        latitude: lib.response.libs[i].lib.latitude,
        longitude: lib.response.libs[i].lib.longitude,
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
