import { Button, Divider, Header, Icon, List, Table } from "semantic-ui-react";
import { Image, Segment } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { decode } from "he";
import Head from "next/head";
import { v4 } from "uuid";
import { useState, useEffect } from "react";

import { Map, MapInfoWindow, MapMarker } from "react-kakao-maps-sdk";
import Script from "next/script";

export default function Entire({ infoData }) {
  const router = useRouter();
  function onClick(e) {
    e.preventDefault();
    router.back();
  }

  const pos = [];
  infoData.map((pos_data) => {
    pos.push({
      name: pos_data.name,
      lating : {
        latitude : Number(pos_data.latitude),
        longitude : Number(pos_data.longitude),
      }
    });
  });

  console.log(pos);

  return (
    <>
      <div style={{ width: "100%", height: "600px" }}>
        <Map
          center={{
            // 지도의 중심좌표
            lat: pos[0].lating.latitude,
            lng: pos[0].lating.longitude,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "450px",
          }}
          level={9} // 지도의 확대 레벨
        >
          {pos.map((position) => (
            <>
              <MapMarker
                key={`${position.name}-${position.lating}`}
                position={position.lating}
                name={position.name}
              />

              <MapInfoWindow
                position={{
                  lat: position.lating.latitude,
                  lng: position.lating.longitude,
                }}
                removable={true} // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
              >
                <div style={{ padding: "5px", color: "#000" }}>
                  {position.name}
                </div>
              </MapInfoWindow>
            </>
          ))}
        </Map>
        <Button onClick={onClick} style={{ marginTop: 10, marginBottom: 20 }}>
          돌아가기
        </Button>
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