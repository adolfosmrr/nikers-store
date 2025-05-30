import { stories } from "../assets/data";
import { useState } from "react";
import gsap from "gsap";
import { useRef, useEffect } from 'react'

// Swiper

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Controller } from 'swiper/modules'

// import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from "react-router-dom";

function ProductCarousel({ setItemCar, setTotal, Title }) {

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [firstSwiper, setFirstSwiper] = useState(null);
    const [secondSwiper, setSecondSwiper] = useState(null);
    const [navReady, setNavReady] = useState(false);

    useEffect(() => {
        if (prevRef.current && nextRef.current) {
            setNavReady(true);
        }
    }, []);

    return (

        // ---- Carrousel Hero Section

        <section className="w-full h-screen min-h-[1000px] 991:min-h-[800px] bg-soft-white">
            <div className="w-full h-full max-w-[1920px] max-auto 1024:flex 1024:flex-row 1024:justify-between 1024:items-center">

                {/* Big Swiper Picture */}

                <div className="w-full h-2/5 overflow-hidden 420:h-1/2 1024:w-1/2 1024:h-full">

                    <Swiper
                        modules={[Navigation, Controller]}
                        slidesPerView={'auto'}
                        onSwiper={setFirstSwiper}
                        navigation={navReady ? {
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        } : false}
                        className="w-full h-full"
                    >
                        {
                            stories.map((slide, index) => (
                                <SwiperSlide key={index} className="w-full h-full relative flex-shrink-0 overflow-hidden 1024:min-h-[800px]">

                                    {/* Background */}

                                    <div className="absolute z-0 w-full h-full top-0 left-0">
                                        <img className="w-full h-full object-cover absolute top-0 left-0 z-0" src={slide.storyBg} alt={slide.newShoesTitle} />
                                        <div className="w-full h-full absolute z-1 backdrop-blur-sm bg-black/50"></div>
                                        <div className="relative z-2 w-full h-full">
                                            <img className="relative w-full left-1/2 transform -translate-x-2/5 420:-translate-y-3/5 420:top-1/2 720:!w-[820px] 720:-translate-x-2/6 920:-translate-x-1/6 1024:-translate-x-2/6 " src={slide.shoesImage} alt={slide.newShoesTitle} />
                                        </div>
                                    </div>

                                    {/* Content */}

                                    <div className="w-full h-full flex items-end relative z-3">
                                        <div className="w-full pb-5 pl-2.5 1024:pl-10 1024:pb-10">
                                            <h1 className="font-advercase text-soft-white text-3xl text-balance 420:text-4xl 720:text-5xl 1024:text-6xl">{slide.newShoesTitle}</h1>
                                            <p className="font-satoshiR text-soft-white text-base 420:text-lg 991:text-lg">{slide.subTitle}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>

                {/* Swiper Items */}

                <div className="w-full h-3/5 flex items-center overflow-hidden px-2.5 420:h-1/2 1024:w-1/2 1024:h-full 1024:px-5">
                    <div className="w-full flex flex-col justify-between gap-4 1024:gap-7">

                        {/* Title Hombres Sneakers */}

                        <h1 className="font-advercase text-dark-grey text-xl">{Title}</h1>

                        {/* Slides */}

                        <div className="w-full">

                            <Swiper
                                slidesPerView={'auto'}
                                spaceBetween={20}
                                modules={[Navigation, Controller]}
                                onSwiper={setSecondSwiper}
                                navigation={navReady ? {
                                    prevEl: prevRef.current,
                                    nextEl: nextRef.current,
                                } : false}
                                className="w-full mb-7"
                            >
                                {
                                    stories.map((slide, index) => (
                                        <SwiperSlide key={index} className="flex-shrink-0 rounded-2xl p-5 bg-[linear-gradient(180deg,#F3F3F3,#644530)] overflow-hidden 1024:!w-3/4 1280:!w-2/3">
                                            <img src={slide.shoesImage} alt={slide.newShoesTitle} className="-mt-10 1024:mt-0 mb-5 w-[280px] 1024:w-full mx-auto" />
                                            <h2 className="font-advercase text-soft-white text-lg">{slide.newShoesTitle}</h2>
                                            <p className="font-satoshiB text-soft-white mb-9">{slide.newShoesPrice}</p>
                                            <div className="w-full flex justify-end items-center gap-3.5">

                                                {/* + Button */}

                                                <div className="size-[20px] deskScreen:size-[25px] bg-soft-white rounded-full flex justify-center items-center relative transition-all hover:rotate-180 cursor-pointer" onClick={() => {
                                                    setItemCar(prev => [...prev, {
                                                        id: item.id,
                                                        shoesImage: item.shoesImage,
                                                        newShoesTitle: item.newShoesTitle,
                                                        newShoesPrice: item.newShoesPrice
                                                    }])

                                                    const priceNumber = parseFloat(item.newShoesPrice.replace('$', ''));
                                                    setTotal(prev => prev + priceNumber);
                                                }}>
                                                    <div className="w-2.5 h-0.5 bg-dark-grey"></div>
                                                    <div className="w-0.5 h-2.5 bg-dark-grey absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"></div>
                                                </div>

                                                {/* Botón de Compra */}

                                                <Link className="px-5 py-2 bg-soft-white flex justify-center items-center cursor-pointer rounded-md"><p className="font-advercase text-dark-grey">{slide.linkLabel}</p></Link>

                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>

                            {/* Swiper Arrows */}

                            <div className="flex items-center gap-2.5">
                                <div className="swiper-button-prev p-5 bg-dark-grey rounded-md cursor-pointer transition-all" ref={prevRef}>
                                    <svg width="33" height="16" viewBox="0 0 33 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.292893 7.3029C-0.0976295 7.69342 -0.0976296 8.32659 0.292892 8.71711L6.65685 15.0811C7.04738 15.4716 7.68054 15.4716 8.07107 15.0811C8.46159 14.6906 8.46159 14.0574 8.07107 13.6669L2.41421 8.01001L8.07107 2.35315C8.46159 1.96263 8.46159 1.32946 8.07107 0.938939C7.68054 0.548415 7.04738 0.548415 6.65686 0.938939L0.292893 7.3029ZM33 8.01001L33 7.01001L1 7.01001L1 8.01001L1 9.01001L33 9.01001L33 8.01001Z" fill="#E4E4E4" />
                                    </svg>
                                </div>
                                <div className="swiper-button-next p-5 bg-dark-grey rounded-md cursor-pointer transition-all" ref={nextRef}>
                                    <svg width="33" height="16" viewBox="0 0 33 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M32.7071 8.6971C33.0976 8.30658 33.0976 7.67341 32.7071 7.28289L26.3431 0.918928C25.9526 0.528403 25.3195 0.528403 24.9289 0.918927C24.5384 1.30945 24.5384 1.94262 24.9289 2.33314L30.5858 7.99L24.9289 13.6468C24.5384 14.0374 24.5384 14.6705 24.9289 15.0611C25.3195 15.4516 25.9526 15.4516 26.3431 15.0611L32.7071 8.6971ZM0 7.98999L-9.65621e-08 8.98999L32 8.99L32 7.99L32 6.99L9.65612e-08 6.98999L0 7.98999Z" fill="#E4E4E4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

    )
}

export default ProductCarousel;