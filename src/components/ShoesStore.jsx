import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { slugify } from "../utils/slugify";
import gsap from "gsap";

function ShoesStore() {

    const [sneakers, setSneakers] = useState([]);
    const [loading, setloading] = useState(true)

    useEffect(() => {
        fetch("https://6825fe46397e48c913148b73.mockapi.io/products/v1/sneakers")
            .then(res => res.json())
            .then(data => {
                setSneakers(data);
                setloading(false);
            })
            .catch(error => {
                console.error("Error al cargar los datos:", error);
                setloading(false)
            })
    }, [])

    if (loading) return <p className="text-center font-satoshiB text-dark-grey py-10">Cargando Sneakers...</p>

    return (

        <section className="w-full bg-soft-white py-5">

            {/* Store Title */}

            <div className="w-full px-2.5 mx-auto max-w-8x1 flex justify-between items-end gap-3.5 mb-5">
                <h1 className="font-advercase text-dark-grey text-lg text-nowrap 720:text-xl 1024:text-2xl">Sneakers</h1>
                <div className="w-full h-px bg-dark-grey"></div>
            </div>

            {/* Store */}

            <div className="w-full grid grid-cols-1 auto-rows-fr gap-2.5 px-2.5 mx-auto max-w-8x1 720:grid-cols-2">
                {
                    sneakers.map((item) => {

                        const coverImage = item.images.find(img => img.includes("cover"));

                        const itemSlug = slugify(item.name);

                        return (

                            <div key={item.id} className="w-full p-5 bg-[#cecece] flex flex-col justify-between items-center rounded-2xl">

                                {/* Item Title */}

                                <div className="w-full">
                                    <h1 className="font-advercase text-2xl text-dark-grey text-balance 920:text-3xl">{item.name}</h1>
                                </div>

                                {/* Item Picture */}

                                <div className="h-full flex justify-center items-end">
                                    <img src={`/images/shoes/${coverImage}`} alt={item.name} className="w-4/5 mb-10"/>
                                </div>

                                {/* Price & Add and Buy Button */}

                                <div className="w-full flex justify-between items-center">

                                    {/* Price */}

                                    <p className="text-base font-satoshiM text-dark-grey 920:text-lg">${item.price}</p>

                                    {/* Add and Buy Button */}

                                    <div className="flex items-center gap-3.5">
                                        <div className="size-[20px] deskScreen:size-[25px] bg-dark-grey rounded-full flex justify-center items-center relative transition-all hover:rotate-180 cursor-pointer" onClick={ () => {
                                                setItemCar( prev => [...prev, {
                                                    id: item.id,
                                                    shoesImage: item.shoesImage,
                                                    newShoesTitle: item.newShoesTitle,
                                                    newShoesPrice: item.newShoesPrice
                                                }] )

                                                const priceNumber = parseFloat( item.newShoesPrice.replace('$', ''));
                                                setTotal( prev => prev + priceNumber );
                                            }}>
                                                <div className="w-2.5 h-0.5 bg-soft-white"></div>
                                                <div className="w-0.5 h-2.5 bg-soft-white absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"></div>
                                            </div>
                                            <Link to={`/sneakers/${itemSlug}`} className="px-4 py-2 deskScreen:px-5 bg-dark-grey rounded-sm cursor-pointer text-sm font-advercase text-soft-white">Ver mas</Link>
                                    </div>

                                </div>

                            </div>

                        )
                    })
                }
            </div>

        </section>

    )

}

export default ShoesStore;