import { Button} from "semantic-ui-react";
import { useRouter } from "next/router";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function LibMap({ MapData }) {
  const router = useRouter();

  // 뒤로가기 버튼 click event
  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  return (
    <>
      <div style={{ width: "100%", height: "600px" }}>
        {/* Map Component : 카카오맵 API 사용을 위해 제공됨*/}
        <Map
          center={{ lat: MapData.latitude, lng: MapData.longitude }}
          style={{ width: "100%", height: "430px" }}
          level={6}
        >
          {/* MapMarker : 지정된 POS위치 위에 마커*/}
          <MapMarker 
            position={{
              lat: MapData.latitude,
              lng: MapData.longitude,
            }}
            draggable={true}
          ></MapMarker>
        </Map>

        <Button color = "black" onClick={returnClick} style={{ marginTop: 10, marginBottom: 20 }}>
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
  console.log(params)
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
