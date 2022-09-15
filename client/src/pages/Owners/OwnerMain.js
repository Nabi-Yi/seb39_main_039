import styled from "styled-components"
import Slider from "react-slick";
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { NextArrow, PrevArrow } from "../../components/Button/SliderArrowButton";
import PlaceList from "../../components/PlaceList";
import { DogCard, AnonymousDogCard } from "../../components/DogCard";

const OwnerMain = () => {
    const settings = {
        slide: 'div',
        dots: true,  
        arrows : true,
        infinite: false, 
        speed: 1000,
        autoplay:false,
        slidesToShow: 1, 
        slidesToScroll: 1, 
        dotsClass : "slick-dots",
        draggable : true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    
    return(
        <div className="container bg-gray">
            <Header>
                <LogoArea>
                    <Logo/>
                </LogoArea>
                <Alert>
                    <FontAwesomeIcon icon={faBell}/>
                </Alert>
            </Header>
            <Section>
                <DogSlide>
                    <Slider {...settings}>
                        <DogCard />
                        <AnonymousDogCard/>
                    </Slider>
                </DogSlide>
            </Section>
            <Section>
                <Weather>
                    <p>날씨API 대기쓰</p>
                </Weather>
            </Section>
            <InfoSection>
                <h3>주변 강아지 동반 카페 <small><FontAwesomeIcon icon={faLocationDot}/> 강남구</small></h3>
                <PlaceList />
            </InfoSection>
        </div>
    )
}

export default OwnerMain


const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:15px;
`
const LogoArea = styled.div`
    svg{width:55px};
`

const Alert = styled.div`
    font-size:19px;
    color:var(--gray-600);
`

const Section = styled.section`
    background:var(--white-000);
    padding:20px 0;
    border-radius:25px;
    margin-bottom:10px;
`

const DogSlide = styled.div`
    padding-bottom:20px;
    .slick-slide{
        padding:0 20px;
    }

    .slick-dots{
       li{ 
        width: auto;
        margin:0 4px;

        button{
            width:5px;
            height:5px;
            background-color:var(--gray-300);
            border-radius: 50px;
            transition: all .5s;
        }
        button:before{
            content: '';
        }
       }

       .slick-active{
            button{
                width:22px;
                background-color: var(--primary);
            }
       }
    }
`

const Weather = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height:60px;
`

const InfoSection = styled.section`
    margin:20px 0 100px;
    h3{
        font-size:17px;
        small{
            font-size:13px;
            margin-left:9px;
            
            svg{
                color:var(--gray-400);
                font-size:12px;
            }
        }
    }
`