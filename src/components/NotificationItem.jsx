import { useEffect } from "react";
import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

function NotificationItem({ id, shoesImage, newShoesTitle, onDismiss }) {

    gsap.registerPlugin(DrawSVGPlugin);

    useEffect(() => {

        const element = document.querySelector(`.notification-item-${id}`);
        if (!element) return;

        gsap.killTweensOf(element)

        // Animación GSAP de entrada

        const notif = gsap.timeline()

        notif.fromTo(element,
            { x: 100, clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' },
            { x: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.8, ease: 'power2.out' }
        )
        .fromTo('.circle', 0.4,
            {drawSVG: "0%"},
            {drawSVG: "100%"}, '<0.1'
        )
        .fromTo('.check', 0.4,
            {drawSVG: "0%"},
            {drawSVG: "100%"}, '<0.1'
        )
        .fromTo(`.notification-item-${id} .notifText`,
            { opacity: 0, x: 10 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', stagger: {amount: 0.2} }, '<0.2'
        )
        .fromTo(`.notification-item-${id} .notifImg`,
            { opacity: 0, x: 10 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '<0.2'
        )
        

        // Animación GSAP hacerlo acá, luego lo hago

        const timer = setTimeout(() => {

            {/* Animación de la desaparición */ }

            gsap.to(element, {
                opacity: 0,
                x: 50,
                duration: 0.5,
                onComplete: () => onDismiss(id)
            })
        }, 3000)

        return () => {
            clearTimeout(timer);
            notif.kill();
        }
    }, [id, onDismiss])

    return (
        <div className={`notifications__content-wrapper flex justify-between items-center py-4 px-5 bg-black/50 backdrop-blur-md rounded-2xl notification-item-${id}`}>


            {/* Imagen de la zapatilla seleccionada */}

            <img src={shoesImage} alt={newShoesTitle} className="notifImg w-auto h-20 mr-2.5" />

            {/* Notification name message */}

            <div className="w-full mr-12">
                <h1 className="notifText font-advercase text-soft-white text-balance text-lg">{newShoesTitle}</h1>
                <p className="notifText font-satoshiM text-soft-white">fue agregado al carrito</p>
            </div>

            {/* Check Icon */}

            <div>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className="circle" cx="14" cy="14" r="13" stroke="#E4E4E4" stroke-width="2" />
                    <path className="check" d="M7.4668 13.9999L12.6001 18.6666L21.4668 10.2666" stroke="#E4E4E4" stroke-width="2" />
                </svg>

            </div>

        </div>
    )

}

export default NotificationItem;