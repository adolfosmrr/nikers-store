import { useEffect } from "react";
import gsap from "gsap";

function GenderShoes() {

    const options = [
        {
            background: '/images/background/men-bg.avif',
            title: 'Hombres',
            contentStyle: ['w-full', 'flex', 'justify-end', 'items-center', 'gap-3.5', 'transition-all', 'group-hover:gap-5']
        },
        {
            background: '/images/background/women-bg.avif',
            title: 'Mujeres',
            contentStyle: ['w-full', 'flex', 'justify-start', 'items-center', 'gap-3.5', 'transition-all', 'group-hover:gap-5']
        },
    ]

    return (
        <section className="w-full h-screen max-h-[800px]">
            <div className="w-full h-full flex">
                {
                    options.map((item, index) => (
                        <a href="#" className="w-1/2 h-full relative cursor-pointer group">

                            {/* Background */}

                            <div className="w-full h-full absolute top-0 left-0 z-0">
                                <img className="w-full h-full object-cover" src={item.background} alt={item.title} />
                                <div className="w-full h-full absolute top-0 left-0 z-1 inset-0 bg-gradient-to-t from-black/70 to-black/0"></div>
                            </div>

                            {/* Content */}

                            <div className="w-full h-full flex flex-col justify-end relative px-10 py-10">
                                <div className={item.contentStyle.join(' ')}>
                                    <h2 className="font-advercase text-lg tabletScreen:text-2x1 text-soft-white">{item.title}</h2>
                                    <div className="size-[20px] deskScreen:size-[25px] bg-soft-white rounded-full flex justify-center items-center relative group-hover:rotate-180 transition-all">
                                        <div className="w-2.5 h-0.5 bg-dark-grey"></div>
                                        <div className="w-0.5 h-2.5 bg-dark-grey absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"></div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))
                }
            </div>
        </section>
    )
}

export default GenderShoes;