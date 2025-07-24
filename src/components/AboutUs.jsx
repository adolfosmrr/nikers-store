import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText)

function AboutUs() {

    useEffect(() => {

        document.fonts.ready.then(() => {

            gsap.set('.aboutPic', { scale: 0.5, rotate: '0' })

            let topSplit = new SplitText('.textTop', { type: 'words', mask: 'words', autoSplit: true })
            let bottomSplit = new SplitText('.textBottom', { type: 'words', mask: 'words', autoSplit: true })

            let topTl = gsap.timeline({ scrollTrigger: { trigger: '.textTop', start: 'top 75%', end: 'bottom 60%', scrub: true } })
            topTl.from(topSplit.words, { opacity: 0.2, stagger: 0.5 })

            
            let picTl = gsap.timeline({ scrollTrigger: { trigger: '.aboutPic', start: 'top 90%', end: 'bottom center', scrub: true } })
            picTl.to('.aboutPic', { scale: 1, rotate: '45' })

            let bottomTl = gsap.timeline({ scrollTrigger: { trigger: '.textBottom', start: 'top 80%', end: 'bottom 70%', scrub: true } })
            bottomTl.from(bottomSplit.words, { opacity: 0.2, stagger: 0.5 })

        })
    }, [])


    let topText = 'Somos Nikers, Nacimos en las canchas, entre dribbles y mates. Aqui, las zapatillas no son solo calzado, son historia y actitud.';
    let bottomText = 'Dos amigos, una obsesion: zapatillas unicas, iconicas y de categoria. Desde las leyendas del asfalto hasta las joyas de coleccion, cada par cuenta una historia';

    return (
        <section id="aboutUs" className="w-full h-full bg-soft-white pt-5 flex flex-col justify-between 720:h-screen 720:max-h-[800px] 920:max-h-none">

            {/* Título de Nosotros */}

            <div className="w-full flex justify-center items-center">
                <div className="w-[50%] h-[2px] bg-dark-grey"></div>
                <h1 className="font-advercase text-dark-grey text-lg px-8 720:text-xl 1024:text-2xl">Nosotros</h1>
                <div className="w-[50%] h-[2px] bg-dark-grey"></div>
            </div>

            {/* Textos de Nosotros */}

            <div className="w-full px-2.5 relative max-w-8x1 mx-auto py-5 720:h-full">

                {/* Background Picture */}

                <div className="aboutPic absolute w-1/2 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rotate-12 z-2 420:w-52 720:w-65">
                    <img className=" opacity-60" src="/images/background/about-bg.avif" />
                </div>

                {/* Text */}

                <div className="w-full flex flex-col justify-between relative 720:h-full">
                    <p className="textTop text-3xl/[1.2] font-advercase text-dark-grey text-center 420:text-4xl mb-70 720:text-5xl/[1.2] 720:mb-0 920:text-6xl/[1.2]">{topText}</p>
                    <p className="textBottom text-3xl/[1.2] font-advercase text-dark-grey text-center 420:text-4xl 720:text-5xl/[1.2] 920:text-6xl/[1.2]">{bottomText}</p>
                </div>
            </div>
        </section>
    )
}

export default AboutUs;