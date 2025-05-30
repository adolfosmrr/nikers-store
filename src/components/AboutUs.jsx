import { useEffect } from "react";
import gsap from "gsap";

function AboutUs() {

    let topText = 'Somos Nikers, Nacimos en las canchas, entre dribles y mates. Aqui, las zapatillas no son solo calzado, son historia y actitud.';
    let bottomText = 'Dos amigos, una obsesion: zapatillas unicas, iconicas y de categoria. Desde las leyendas del asfalto hasta las joyas de coleccion, cada par cuenta una historia';

    return (
        <section id="aboutUs" className="w-full h-full bg-soft-white pt-5 pb-20">

            {/* Título de Nosotros */}

            <div className="w-full flex justify-center items-center mb-16">
                <div className="w-[50%] h-[2px] bg-dark-grey"></div>
                <h1 className="font-advercase text-dark-grey text-xl px-8">Nosotros</h1>
                <div className="w-[50%] h-[2px] bg-dark-grey"></div>
            </div>

            {/* Textos de Nosotros */}

            <div className="w-full px-2.5 tabletScreen:px-10 deskScreen:px-2.5 relative flex flex-col justify-between max-w-8x1 mx-auto h-screen max-h-[750px]">

                {/* Background Picture */}

                <div className="absolute w-3xs top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rotate-12 z-2 mix-blend-multiply">
                    <img className="opacity-60" src="/images/background/about-bg.avif" />
                </div>

                {/* Text */}

                <div className="w-full h-full flex flex-col justify-between relative">
                    <p className=" text-3xl/[1.2] 420:text-4xl/[1.2] 720:text-5xl/[1.2] 991:text-6xl/[1.2] font-advercase text-dark-grey text-center">{topText}</p>
                    <p className=" text-3xl/[1.2] 420:text-4xl/[1.2] 720:text-5xl/[1.2] 991:text-6xl/[1.2] font-advercase text-dark-grey text-center">{bottomText}</p>
                </div>
            </div>
        </section>
    )

}

export default AboutUs;