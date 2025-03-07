import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination , Autoplay , EffectFade} from "swiper";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css";

const LoginSlider = ({}) => {

  return (
    <>
       {/* <Swiper    
            pagination={{
                clickable: true,
            }}
            effect={"fade"}
            fadeEffect= {{
                crossFade: true
            }}
            speed={500}
            autoplay={{
                delay: 5000,
                disableOnInteraction: true,
            }}
            modules={[Pagination, Autoplay, EffectFade]} 

            className="loginSwiper">
            <SwiperSlide>
                <div className='loginSlide'>
                    <img src='images/loginSlider_1.svg' alt=""/>
                    <h4>Designed with love for ALF</h4>
                    <p>Because we love the beautiful game, we made it a pastime.</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='loginSlide'>
                    <img src='images/loginSlider_2.svg' alt=""/>
                    <h4>to aid companionship in healthy contests</h4>
                    <p>Compete healthily. Prove your knowledge of the sport each game week.</p>
                </div>
            </SwiperSlide>
        </Swiper> */}
    </>
  );
};

export default LoginSlider;
