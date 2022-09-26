import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Header } from "../../../components/Layout/Header";
import WantedCard from "../../../components/WantedCard";
import { SwitchButton } from "../../../components/Switch";
import { FloatingBtnAdd } from "../../../components/Button/FloatingBtn";
import DropDown from "../../../components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { getAllWantedList } from "../../../redux/actions/wantedActions";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const WantedList = () => {
  const { allWantedList, loading } = useSelector((state) => state.wanted);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOn, setIsOn] = useState(false);
  const [matchedToggle, setMatchedToggle] = useState(false);
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [selectedLocation, setSelectedLocation] = useState("서울시 강동구");

  let sortOption, checked;

  const toggleHandler = () => {
    setIsOn(!isOn);
  };

  const sortData = [{ name: "최신순" }, { name: "보수순" }];
  const sortData2 = [{ name: "서울시 강동구" }, { name: "경기도 수원시" }];

  if (selectedSort === "최신순") {
    sortOption = "recent";
  } else {
    sortOption = "pay";
  }

  useEffect(() => {
    dispatch(getAllWantedList(sortOption, `${selectedLocation}`, isOn));
    navigate(
      `/wantedList?sort=${sortOption}&location=${selectedLocation}&matched=${isOn}`
    );
  }, [sortOption, isOn, selectedLocation]);

  return (
    <div className="container bg-gray">
      <Header pageTitle={"구인글 리스트"} useRight="on" link={'/ownerMain'}/>

      <ListFilter>
        <ul className="sort-group">
          <li>
            <DropDown
              name={selectedSort}
              data={sortData}
              setSelectedSort={setSelectedSort}
              value={"sortData"}
            />
          </li>
          <li>
            <DropDown
              name={selectedLocation}
              data={sortData2}
              setSelectedLocation={setSelectedLocation}
              value={"sortData2"}
            />
          </li>
        </ul>
        <SwitchGroup>
          <em>매칭 된 글 제외</em>
          <SwitchButton isOn={isOn} toggleHandler={toggleHandler} />
        </SwitchGroup>
      </ListFilter>
      {loading ? (
        <Loading>
          <ThreeDots color="#3183f8" height={80} width={80} />
        </Loading>
      ) : (
        <WantedCardList>
          {allWantedList.items?.map((item) => (
            <WantedCard key={item.id} item={item} />
          ))}

          <FloatingBtnAdd mid={"wantedCreate"} />
        </WantedCardList>
      )}
    </div>
  );
};

export default WantedList;

const ListFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  margin: 15px 0 10px;

  .sort-group {
    display: flex;
    gap: 10px;
  }
`;

const WantedCardList = styled.div`
  > div {
    margin: 8px 0;
  }
`;

const SwitchGroup = styled.div`
  display: flex;
  align-items: center;
  font-family: "Pretendard-Medium";
  gap: 5px;
`;

const Loading = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;