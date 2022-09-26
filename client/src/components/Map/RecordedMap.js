import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocation,
  getWalkDetailInfo
} from "../../redux/actions/mappingAction";
import styled from "styled-components";
import { Header } from "../Layout/Header";
import { useNavigate } from "react-router-dom";
import { faLocationArrow, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { kakao } = window;

const TrackingMap = () => {
  const [myMap, setMyMap] = useState(null);
  const [recordedLine, setRecordedLine] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lat, lon, walkDetailInfo } = useSelector((state) => state.mapping);

  function getGeolocation() {
    let geolocation = navigator.geolocation.watchPosition(
      function (position) {
        dispatch(
          getLocation(position.coords.latitude, position.coords.longitude)
        );
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 0
      }
    );
  }

  const drawMap = async () => {
    let container = document.getElementById("myMap");
    let options = {
      center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    setMyMap(new kakao.maps.Map(container, options));
  };

  const panTo = async () => {
    let moveLatLon = new kakao.maps.LatLng(lat, lon);
    myMap.panTo(moveLatLon);
  };

  const drawLine = async () => {
    let polyline = new kakao.maps.Polyline({
      map: myMap,
      path: recordedLine,
      strokeWeight: 10,
      strokeColor: "#3183f8",
      strokeOpacity: 1,
      strokeStyle: "solid"
    });
    polyline.setMap(myMap);
  };

  const makeRecordObj = () => {
    const recordObj = walkDetailInfo.coord?.map((el) => {
      return new kakao.maps.LatLng(...el?.split(" "));
    });
    setRecordedLine(recordObj);
  };

  useEffect(() => {
    if (lat > 0 && lon > 0) {
      drawLine();
    }
  }, [recordedLine]);

  useEffect(() => {
    getGeolocation();
    dispatch(getWalkDetailInfo(1));
    makeRecordObj();
    if (lat > 0 && lon > 0) {
      drawMap();
    }
  }, [lat, lon]);

  return (
    <MapBox>
      <Header />
      <Map id="myMap" style={{ width: "375px", height: "300px" }}></Map>
      {recordedLine ? (
        <Handler>
          <MapGPSBtn
            onClick={() => {
              panTo();
            }}
          >
            <FontAwesomeIcon color="#ffff" icon={faLocationArrow} size="2x" />
          </MapGPSBtn>
          <MapRefreshBtn
            onClick={() => {
              // navigate("/walk/1/recordedWalking");

              dispatch(getWalkDetailInfo(1));
            }}
          >
            <FontAwesomeIcon color="#ffff" icon={faRotate} size="2x" />
          </MapRefreshBtn>
        </Handler>
      ) : (
        <></>
      )}
    </MapBox>
  );
};

const MapBox = styled.div`
  background-color: white;
  height: 100vh;
`;

const Map = styled.div`
  opacity: 0.6;
  position: relative;
  ::before {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 100px;
    background: linear-gradient(to top, white, transparent);
    z-index: 2;
    content: "";
  }
`;

const Handler = styled.div`
  display: flex;
  position: absolute;
  top: 370px;
  right: 30%;
  text-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  span {
    margin: 10px;

    > svg {
      stroke-width: 5px;
      color: #ffff;
      stroke: white;
      filter: drop-shadow(1px 1px 1px silver);
    }
  }
`;

const MapRefreshBtn = styled.span`
  cursor: pointer;
`;

const MapGPSBtn = styled.span`
  cursor: pointer;
`;

export default TrackingMap;