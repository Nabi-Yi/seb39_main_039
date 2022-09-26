import styled from "styled-components";
import Lottie from 'lottie-react';
import { Header } from "../../components/Layout/Header";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loadinglottie } from "../..";
import { getPetWalkPendingInfo } from "../../redux/actions/petwalkActions";
import HistoryCard from "../../components/HistoryCard";

const WalkerHistory = () =>{
    const petId = useParams();
    const dispatch = useDispatch();
    const petWalkPendingInfo = useSelector((state) => state.petwalk.petWalkPendingInfo);
  
    useEffect(() => {
      dispatch(getPetWalkPendingInfo(Number(petId.id)));
    }, []);

    return(
        <div className="container bg-gray">
            <Header pageTitle={`대기중인 산책 내역`} />
            {petWalkPendingInfo.items.length !== 0 ?
                <List>
                {petWalkPendingInfo.items?.map((el) => {
                  return (
                    <li>
                        <div>
                            <p>의뢰인 : {el.owner.fullName}</p>
                            <p>산책 가는 강아지 : </p>
                            <p>산책 시작일 : {el.startTime}</p>
                            <p>산책 종료일 : {el.endTime}</p>
                        </div>
                    </li>
                  );
                })}
              </List>
            :
                <div className="pg-info">
                    <div>
                        <i><Lottie animationData={Loadinglottie} /></i>
                        <h4>대기중인 산책 내역이 없습니다.</h4>
                        <p>대기중인 산책 내역을<br />이곳에서 확인 하실 수 있습니다.</p>
                    </div>
                </div>
            } 
        </div>
    )
}

export default WalkerHistory

const List = styled.ul`
    padding:5px 0 40px;
    li+li{
        margin-top:20px
    }
`