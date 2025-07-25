import { useEffect } from 'react';
import { runCarouselAnimations } from '../assets/carousel-gsap';
import { gsap } from 'gsap';

function HomeHero() {

    useEffect(() => {
        runCarouselAnimations();
    }, []);

    return (
        <section className="w-full h-screen min-h-[1000px] max-h-[1080px] bg-black cursor-auto hero:cursor-none">
            <div className="container w-full h-full overflow-hidden min-h-[1000px]">
                <div className="cursor hidden absolute top-0 left-0 size-[100px] hero:flex justify-center items-center bg-black/50 backdrop-blur-xs rounded-full pointer-events-none z-2"><p className="text-soft-white font-satoshiL text-sm uppercase "></p></div>

                <div className="story-img absolute top-0 left-0 w-screen h-screen overflow-hidden opacity-50 min-h-[1000px]">
                    <div className="img absolute top-0 left-0 w-full h-full"><img className="absolute top-0 left-0 size-full object-cover" src='/images/home-carousel/air-force--bg.avif' alt='' /></div>
                    <div className="w-full h-full absolute z-2 bg-black/20 mix-blend-multiply backdrop-blur-sm"></div>
                </div>

                <div className="story-content absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full hero:w-[40%] h-full flex flex-col justify-between px-8 py-20 hero:py-20 hero:px-0 hero:items-center overflow-hidden min-h-[800px]">
                    <div className="row w-full">
                        <div className="indices w-full h-[10px] flex justify-between content-center gap-1">
                            <div className="index relative w-full h-px bg-dark-grey/50"><div className="index-highlight"></div></div>
                            <div className="index relative w-full h-px bg-dark-grey/50"><div className="index-highlight"></div></div>
                            <div className="index relative w-full h-px bg-dark-grey/50"><div className="index-highlight"></div></div>
                            <div className="index relative w-full h-px bg-dark-grey/50"><div className="index-highlight"></div></div>
                            <div className="index relative w-full h-px bg-dark-grey/50"><div className="index-highlight"></div></div>
                            <div className="index relative w-full h-px bg-dark-grey/50"><div className="index-highlight"></div></div>
                        </div>
                        <div className="profile w-full h-[60px] flex gap-4 items-center">
                            <div className="profile-icon relative size-[40] rounded-full overflow-hidden">
                                <img src='/images/home-carousel/lifestyle-profile.avif' atl='' />
                            </div>
                            <div className="profile-name relative w-[200px] h-[20px] ">
                                <p className="text-soft-white font-satoshiM text-sm absolute t-0">Nike Lifestyle</p>
                            </div>
                        </div>
                    </div>
                    <div className="shoesDiv mx-auto w-[80%] hero:w-full">
                        <img src="/images/shoes/air-force-1-low-retro/cover.avif" alt="" />
                    </div>
                    <div className="row w-full">
                        <div className="title">
                            <div className="title-row relative w-full h-[70px]"><h1 className="text-soft-white font-advercase text-6xl absolute t-0">Air Force 1</h1></div>
                            <div className="title-row relative w-full h-[60px]"><h1 className="text-soft-white font-advercase text-6xl absolute t-0">Low Retro</h1></div>
                            <div className="title-row paragraph relative w-full h-[60px]"><h1 className="text-soft-white font-satoshiR text-lg absolute t-0">Una leyenda silenciosa desde 2002.</h1></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeHero;