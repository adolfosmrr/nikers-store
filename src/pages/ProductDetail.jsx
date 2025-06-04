import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { slugify } from '../utils/slugify';
import { gsap } from "gsap/gsap-core";

// Swiper

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css';

function ProductDetail({ setItemCar, setTotal }) {

    
    const { slug } = useParams();
    const [sneaker, setSneaker] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null); {/* Obtener la talla de los zapatos */ }

    useEffect(() => {
        fetch("https://6825fe46397e48c913148b73.mockapi.io/products/v1/sneakers")
            .then(res => res.json())
            .then(data => {
                const product = data.find(item => slugify(item.name) === slug);
                setSneaker(product || null);
                setLoading(false);
            })
            .catch(() => {
                setSneaker(null)
                setLoading(false)
            })
    }, [slug])

    if (loading) return <p>Cargando...</p>;
    if (!sneaker) return <p>Producto no encontrado.</p>

    {/* Función de cargar la zapatilla al carrito */ }

    function handleAddToCart() {

        if (!selectedSize) {
            alert('Por favor seleccioná una talla antes de agregar al carrito.');
            return;
        }

        const coverPath = sneaker.images.find(img => img.includes('cover.avif'))

        const coverUrl = `/images/shoes/${coverPath}`

        const newItem = {
            id: sneaker.id,
            newShoesTitle: sneaker.name,
            priceUnitario: sneaker.price,
            size: selectedSize,
            quantity: 1,
            shoesImage: coverUrl,
        };

        setItemCar((prevCar) => {

            const id = prevCar.findIndex(
                (item) => item.id === newItem.id && item.size === newItem.size
            )

            if (id !== -1) {
                const updatedCar = [...prevCar];
                updatedCar[id] = {
                    ...updatedCar[id],
                    quantity: updatedCar[id].quantity + 1.
                };
                return updatedCar;
            } else {
                return [...prevCar, newItem]
            }
        });

        setTotal((prevTotal) => prevTotal + sneaker.price);
    }

    return (

        <section className="w-full h-screen min-h-[850px] bg-soft-white 920:flex">

            {/* Picture Carousel Swiper */}

            <div className="w-full h-1/2 relative flex justify-end items-end pr-2.5 pb-2.5 920:w-1/2 920:h-full">

                <Swiper
                    slidesPerView={1}
                    modules={[Navigation]}
                    navigation={true}
                    className='w-full h-full !absolute top-0 left-0 z-0'
                >

                    {/* Carousel Slide */}

                    {
                        sneaker.images
                            .filter(img => !img.includes('cover'))
                            .slice(0, 5)
                            .map((slide, index) => {

                                const pictureRoute = '/images/shoes/';

                                return (

                                    <SwiperSlide key={index} className="w-full h-full !flex justify-center items-center bg-[#F3F3F3]">
                                        <img src={`${pictureRoute}${slide}`} alt={slide.name} className="w-full h-full object-cover 920:h-auto" />
                                    </SwiperSlide>
                                )
                            })
                    }
                </Swiper>

                {/* Swiper Arrows */}

                <div className="flex justify-between items-center gap-2.5 relative z-1">

                    {/* Left Arrow */}

                    <div className="swiper-button-prev bg-dark-grey p-5 flex justify-center items-center rounded-sm cursor-pointer">
                        <svg width="33" height="16" viewBox="0 0 33 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.292893 7.30314C-0.0976295 7.69367 -0.0976296 8.32683 0.292892 8.71736L6.65685 15.0813C7.04738 15.4718 7.68054 15.4718 8.07107 15.0813C8.46159 14.6908 8.46159 14.0576 8.07107 13.6671L2.41421 8.01025L8.07107 2.3534C8.46159 1.96287 8.46159 1.32971 8.07107 0.939183C7.68054 0.548659 7.04738 0.548659 6.65686 0.939183L0.292893 7.30314ZM33 8.01025L33 7.01025L1 7.01025L1 8.01025L1 9.01025L33 9.01025L33 8.01025Z" fill="#E4E4E4" />
                        </svg>
                    </div>

                    {/* Right Arrow */}

                    <div className="swiper-button-next bg-dark-grey p-5 flex justify-center items-center rounded-sm cursor-pointer">
                        <svg width="33" height="16" viewBox="0 0 33 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.7071 8.69735C33.0976 8.30682 33.0976 7.67366 32.7071 7.28313L26.3431 0.919172C25.9526 0.528647 25.3195 0.528647 24.9289 0.919171C24.5384 1.3097 24.5384 1.94286 24.9289 2.33339L30.5858 7.99024L24.9289 13.6471C24.5384 14.0376 24.5384 14.6708 24.9289 15.0613C25.3195 15.4518 25.9526 15.4518 26.3431 15.0613L32.7071 8.69735ZM0 7.99024L-9.65621e-08 8.99024L32 8.99024L32 7.99024L32 6.99024L9.65612e-08 6.99024L0 7.99024Z" fill="#E4E4E4" />
                        </svg>
                    </div>
                </div>

            </div>

            {/* Sneaker Detail */}

            <div className="w-full h-1/2 max-w-8x1 mx-auto px-2.5 py-7 920:w-1/2 920:h-full 920:flex 920:flex-col 920:justify-center 920:px-5">

                {/* Title & Price */}

                <div>

                    <h1 className="font-advercase text-dark-grey text-3xl text-balance mb-1.5 420:text-4xl 720:text-5xl">{sneaker.name}</h1>
                    <p className="font-satoshiB text-dark-grey text-base">${sneaker.price}.00</p>

                </div>

                {/* Sizes */}

                <form className="pt-6">
                    <fieldset className="w-full flex justify-between 420:justify-start 420:gap-2.5 items-center pb-6">
                        {sneaker.sizes.map((size, idx) => {

                            const inputId = `size-${size}-${idx}`;

                            return (
                                <div
                                    key={inputId}

                                    onClick={() => setSelectedSize(size)}
                                    className={[
                                        "labelWrapper relative size-10 flex justify-center items-center border-2 rounded-sm cursor-pointer transition-all duration-300 group",

                                        selectedSize === size
                                            ? "bg-dark-grey border-dark-grey"
                                            : "bg-soft-white border-dark-grey",

                                        "hover:bg-dark-grey"
                                    ].join(" ")}
                                >
                                    {/* El input */}

                                    <input
                                        type="radio"
                                        id={inputId}
                                        name="size"
                                        value={size}
                                        className="invisible absolute top-0 left-0 w-full h-full"

                                        checked={selectedSize === size}
                                        readOnly
                                    />

                                    {/* Label */}

                                    <label
                                        htmlFor={inputId}
                                        className={[
                                            "label font-satoshiB text-sm select-none transition-colors duration-300 cursor-pointer",

                                            selectedSize === size ? "text-soft-white" : "text-dark-grey",
                                            'group-hover:text-soft-white'
                                        ].join(" ")}
                                    >
                                        {size}
                                    </label>
                                </div>
                            );
                        })}
                    </fieldset>


                    {/* Details Info */}

                    <div>

                        {/* Sneaker Description */}

                        <p className="w-full text-sm text-dark-grey font-satoshiM text-balance mb-5 720:text-base">{sneaker.description}</p>

                        {/* Sneaker Features */}

                        <div className="mb-5">

                            <p className="text-dark-grey font-satoshiM text-sm 720:text-base"><span className="font-satoshiB">Color: </span>{sneaker.Color}</p>
                            <p className="text-dark-grey font-satoshiM text-sm 720:text-base"><span className="font-satoshiB">SKU: </span>{sneaker.SKU}</p>

                        </div>

                    </div>

                    {/* Buy Button */}

                    <button
                        onClick={handleAddToCart}
                        className="px-5 py-2 bg-dark-grey rounded-sm flex justify-center items-center text-soft-white text-sm font-advercase cursor-pointer"
                    >
                        Agregar al carrito
                    </button>

                </form>
            </div>

        </section >
    )

}

export default ProductDetail;