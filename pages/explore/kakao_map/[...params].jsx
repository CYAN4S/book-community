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

export default function LibMap({ MapData }) {
  const router = useRouter();
  function onClick(e) {
    e.preventDefault();
    router.back();
  }

  return (
    <>

      <div style={{ width: "100%", height: "600px" }}>
        <Map
          center={{ lat: MapData.latitude, lng: MapData.longitude }}
          style={{ width: "100%", height: "430px" }}
          level={6}
        >
          <MapMarker
            position={{
              lat: MapData.latitude,
              lng: MapData.longitude,
            }}
            draggable={true}
          ></MapMarker>

          <MapInfoWindow
            position={{
              lat: MapData.latitude,
              lng: MapData.longitude,
            }}
            removable={true} // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
          >
            <div style={{ padding: "5px", color: "#000" }}>{MapData.name}</div>
          </MapInfoWindow>
        </Map>

        <Button color = "black" onClick={onClick} style={{ marginTop: 10, marginBottom: 20 }}>
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

export async function getServerSideProps({ params: { params } }) {
  let [latitude, longitude, name] = params;
  latitude = Number(latitude);
  longitude = Number(longitude);

  const MapData = { latitude: latitude, longitude: longitude, name: name };

  return {
    props: {
      MapData: MapData,
    },
  };
}
