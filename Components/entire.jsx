import { Button, Divider, Header, Icon, List, Table } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { Map, MapInfoWindow, MapMarker } from "react-kakao-maps-sdk";
export default function Entire({ infoData }) {
  const hasBookLib = [];
  const availBookLib = [];
  const pos = [];

  // 소장/대출가능여부/기본 체크 필터
  const [hasBookCheck, setHasBookCheck] = useState(false);
  const [availLoanCheck, setAvailLoanCheck] = useState(false);
  const [defaultCheck, setDefaultCheck] = useState(true);

  // 필터 선택에 따른 분기
  function checkDefault(e) {
    setHasBookCheck(false);
    setAvailLoanCheck(false);
    setDefaultCheck(true);
  }

  function checkHasBook(e) {
    setHasBookCheck(true);
    setAvailLoanCheck(false);
    setDefaultCheck(false);
  }

  function checkAvailLoan(e) {
    setHasBookCheck(false);
    setAvailLoanCheck(true);
    setDefaultCheck(false);
  }

  // 도서관 위치 데이터를 배열 push
  infoData.map((pos_data) => {
    pos.push({
      name: pos_data.name,
      lating: {
        latitude: Number(pos_data.latitude),
        longitude: Number(pos_data.longitude),
      },
    });

    if (pos_data.value.response.result.hasBook === "Y") {
      hasBookLib.push({
        name: pos_data.name,
        lating: {
          latitude: Number(pos_data.latitude),
          longitude: Number(pos_data.longitude),
        },
      });
    }

    if (pos_data.value.response.result.loanAvailable === "Y") {
      availBookLib.push({
        name: pos_data.name,
        lating: {
          latitude: Number(pos_data.latitude),
          longitude: Number(pos_data.longitude),
        },
      });
    }
  });

  return (
    <>
      <div style={{ width: "100%", height: "540px" }}>
        <div className="btnSet">
          <Button color = "red" onClick={checkDefault} style={{fontFamily : "Stylish-Regular", fontSize : 15}}> 전체 확인하기 </Button>
          <Button color = "teal" onClick={checkHasBook} style={{fontFamily : "Stylish-Regular", fontSize : 15}}> 소장된 도서관 확인하기 </Button>
          <Button color = "violet"onClick={checkAvailLoan} style={{fontFamily : "Stylish-Regular", fontSize : 15}}> 대출 가능한 도서관 확인하기 </Button>
        </div>
        {defaultCheck && (
          <>
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
                      <p style={{fontSize : 11, fontFamily : "GothicA1-Medium"}}>{position.name}</p>
                    </div>
                  </MapInfoWindow>
                </>
              ))}
            </Map>
          </>
        )}

        {hasBookCheck && (
          <>
            <Map
              center={{
                // 지도의 중심좌표
                lat: hasBookLib[0].lating.latitude,
                lng: hasBookLib[0].lating.longitude,
              }}
              style={{
                // 지도의 크기
                width: "100%",
                height: "450px",
              }}
              level={9} // 지도의 확대 레벨
            >
              {hasBookLib.map((position) => (
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
                    removable={true} 
                    
                    
                  >
                    <div style={{ padding: "5px", color: "#000" }}>
                      <p style={{fontSize : 11, fontFamily : "GothicA1-Medium"}}>{position.name}</p>
                    </div>
                  </MapInfoWindow>
                </>
              ))}
            </Map>
          </>
        )}

        {availLoanCheck && (
          <>
             <Map
              center={{
                // 지도의 중심좌표
                lat: availBookLib[0].lating.latitude,
                lng: availBookLib[0].lating.longitude,
              }}
              style={{
                // 지도의 크기
                width: "100%",
                height: "450px",
              }}
              level={9} // 지도의 확대 레벨
            >
              {availBookLib.map((position) => (
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
                    removable={true} 
                  >
                    <div style={{ padding: "5px", color: "#000" }}>
                      <p style={{fontSize : 10, fontFamily : "GothicA1-Medium"}}>{position.name}</p>
                    </div>
                  </MapInfoWindow>
                </>
              ))}
            </Map>
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

        .btnSet {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom : 10px;
        }
      `}</style>
    </>
  );
}
