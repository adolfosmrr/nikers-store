import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { slugify } from "../utils/slugify";
import gsap from "gsap";


function ShoesStore({ itemCar, setItemCar, setTotal, addNotification }) {

    const [sneakers, setSneakers] = useState([]);
    const [loading, setloading] = useState(true);
    const [selectedSizesForItems, setSelectedSizesForItems] = useState({});

    useEffect(() => {
        fetch("https://6825fe46397e48c913148b73.mockapi.io/products/v1/sneakers")
            .then(res => res.json())
            .then(data => {
                setSneakers(data);
                setloading(false);
            })
            .catch(error => {
                console.error("Error al cargar los datos:", error);
                setloading(false);
            });
    }, []);

    if (loading) return <p className="text-center font-satoshiB text-dark-grey py-10">Cargando Sneakers...</p>;

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
                        
                        const coverImageName = item.images.find(img => img.includes("cover.avif"));
                        const coverImageUrl = coverImageName ? `/images/shoes/${coverImageName}` : ''; 

                        const itemSlug = slugify(item.name);

                        return (
                            <div key={item.id} className="w-full p-5 bg-[#cecece] flex flex-col justify-between items-center rounded-2xl">

                                {/* Item Title */}

                                <div className="w-full">
                                    <h1 className="font-advercase text-2xl text-dark-grey text-balance 920:text-3xl">{item.name}</h1>
                                </div>

                                {/* Item Picture */}

                                <div className="h-full flex justify-center items-end">
                                    {coverImageUrl && <img src={coverImageUrl} alt={item.name} className="w-4/5 mb-10"/>}
                                </div>

                                {/* Price & Add and Buy Button */}
                                <div className="w-full flex justify-between items-center">
                                    {/* Price */}
                                    <p className="text-base font-satoshiB text-dark-grey 920:text-lg">${item.price}</p>

                                    {/* Add and Buy Button */}
                                    <div className="flex items-center gap-3.5">
                                        <form>
                                            <select
                                                className="border-dark-grey border-2 text-dark-grey font-satoshiB text-sm px-4 py-2 rounded-sm cursor-pointer text-center focus:outline-none focus:border-dark-grey"
                                                onChange={(e) => {
                                                    setSelectedSizesForItems(prevSizes => ({
                                                        ...prevSizes,
                                                        [item.id]: e.target.value
                                                    }));
                                                }}
                                                value={selectedSizesForItems[item.id] || ''}
                                            >
                                                <option value="">Talla</option>
                                                {
                                                    item.sizes.map((size, idx) => (
                                                        <option
                                                            key={`${item.id}-${size}-${idx}`}
                                                            value={size}
                                                        >
                                                            {size}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </form>


                                        <div className="size-[20px] deskScreen:size-[25px] bg-dark-grey rounded-full flex justify-center items-center relative transition-all hover:rotate-180 cursor-pointer"
                                            onClick={() => {
                                                
                                                const selectedSize = selectedSizesForItems[item.id];

                                               
                                                if (!selectedSize || selectedSize === "") {
                                                    alert('Por favor seleccioná una talla antes de agregar al carrito.');
                                                    return; 
                                                }

                                                const exists = itemCar.find((shoe) => shoe.id === item.id && shoe.size === selectedSize);

                                                if (exists) {
                                                    setItemCar((prev) =>
                                                        prev.map((shoe) => {
                                                            if (shoe.id === item.id && shoe.size === selectedSize) {
                                                                return { ...shoe, quantity: shoe.quantity + 1 };
                                                            }
                                                            return shoe;
                                                        })
                                                    );
                                                } else {
                                                    
                                                    setItemCar((prev) => [
                                                        ...prev,
                                                        {
                                                            id: item.id,
                                                            shoesImage: coverImageUrl, 
                                                            newShoesTitle: item.name, 
                                                            priceUnitario: item.price, 
                                                            size: selectedSize, 
                                                            quantity: 1,
                                                        },
                                                    ]);
                                                }

                                                
                                                setTotal((prev) => prev + item.price);

                                                addNotification({
                                                    shoesImage: coverImageUrl,
                                                    newShoesTitle: item.name,
                                                })

                                               
                                                setSelectedSizesForItems(prevSizes => {
                                                    const newSizes = { ...prevSizes };
                                                    delete newSizes[item.id];
                                                    return newSizes;
                                                });
                                            }}>
                                            <div className="w-2.5 h-0.5 bg-soft-white"></div>
                                            <div className="w-0.5 h-2.5 bg-soft-white absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"></div>
                                        </div>
                                        <Link to={`/sneakers/${itemSlug}`} className="px-4 py-2 deskScreen:px-5 bg-dark-grey rounded-sm cursor-pointer text-sm font-advercase text-soft-white">Ver mas</Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}

export default ShoesStore;