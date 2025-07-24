import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { slugify } from "../utils/slugify";
import gsap from "gsap";

function NewShoes({ itemCar, setItemCar, setTotal, addNotification }) {

    const [sneakers, setSneakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSizesForItems, setSelectedSizesForItems] = useState({})
    const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://6825fe46397e48c913148b73.mockapi.io/products/v1/sneakers")
            .then(res => res.json())
            .then(data => {
                const newSneakers = data.filter(item => item.newShoes === true);
                setSneakers(newSneakers);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error);
                setLoading(false);
            });
    }, []); 

    if (loading) {
        return <p>Cargando zapatillas nuevas...</p>;
    }

    if (sneakers.length === 0) {
        return <p className="text-dark-grey font-satoshiB text-center py-10">No hay zapatillas nuevas disponibles en este momento.</p>;
    }

    return (
        <section className="w-full h-full bg-soft-white py-5">
            <div className="max-w-8x1 mx-auto px-2.5">
                {/* Title */}
                <div className="w-full flex justify-between items-end mx-auto mb-5">
                    <h1 className="text-dark-grey text-xl text-nowrap pr-7 font-advercase" >Nuevos Sneakers</h1>
                    <div className="w-[100%] h-[2px] bg-dark-grey"></div>
                    <a onClick={() => navigate(`/ProductMen`)} className="text-dark-grey font-satoshiB text-nowrap text-base pl-7 cursor-pointer">ver todos</a>
                </div>

                {/* Shoes Items */}
                <div className="w-full max-w-8x1 mx-auto grid grid-cols-1 720:grid-cols-2 grid-rows-2 auto-rows-ft gap-2.5">
                    {
                        sneakers.map((item) => {
                            const coverImageName = item.images.find(imageName => imageName.includes('cover.avif'));
                            const coverImageUrl = coverImageName ? `/images/shoes/${coverImageName}` : '';

                            return (
                                <div key={item.id} className="w-full p-2.5 deskScreen:p-5 relative rounded-2xl overflow-hidden group">

                                    {/* Items Background */}
                                    <div className="w-full h-full absolute top-0 left-0">
                                        <img src={item.newShoesBg} className="z- w-full h-full object-cover transition-all duration-500 group-hover:rotate-12 group-hover:scale-150" alt={`${item.name} background`} />
                                        <div className="bg-black/50 w-full h-full absolute z-1 top-0 left-0 backdrop-blur-xs"></div>
                                    </div>

                                    {/* Item Content */}
                                    <div className="relative z-2 p-5 flex flex-col justify-between w-full h-full">
                                        <h2 className="font-advercase text-soft-white text-xl tabletScreen:text-2xl deskScreen:text-3xl max-w-full text-balance h-1/3">{item.name}</h2>
                                        {coverImageUrl && <img src={coverImageUrl} className="w-4/5 mx-auto mb-6" alt={item.name} />}
                                        <div className="flex justify-between items-center">
                                            <p className="text-base tabletScreen:text-lg deskScreen:text-xl text-soft-white font-satoshiB">${item.price}.00</p>
                                            <div className="flex justify-between items-center gap-3.5">

                                                {/* Size Options */}
                                                <form>
                                                    <select
                                                        className="border-soft-white border-2 text-soft-white font-satoshiB text-sm px-4 py-2 rounded-sm cursor-pointer bg-black/50 text-center focus:outline-none focus:border-soft-white"
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

                                                {/* Add Button */}
                                                <div className="add size-[20px] deskScreen:size-[25px] bg-soft-white rounded-full flex justify-center items-center relative transition-all hover:rotate-180 cursor-pointer"
                                                    onClick={() => { 

                                                        
                                                        const selectedSize = selectedSizesForItems[item.id];

                                                        
                                                        if (!selectedSize || selectedSize === "") {
                                                            alert('Por favor seleccioná una talla antes de agregar al carrito.');
                                                            return;
                                                        }

                                                        const exists = itemCar.find((shoe) => shoe.id === item.id && shoe.size === selectedSize);
                                                        const newItemShoesImage = `/images/shoes/${item.images.find(imageName => imageName.includes('cover.avif'))}`;


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
                                                                    shoesImage: newItemShoesImage,
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
                                                    }}
                                                >
                                                    <div className="w-2.5 h-0.5 bg-dark-grey"></div>
                                                    <div className="w-0.5 h-2.5 bg-dark-grey absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"></div>
                                                </div>

                                                {/* View More Button */}
                                                <a className="px-4 py-2 deskScreen:px-5 bg-soft-white rounded-sm cursor-pointer text-sm font-advercase text-dark-grey"
                                                    onClick={() => navigate(`/sneakers/${slugify(item.name)}`)}
                                                >
                                                    Ver mas
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default NewShoes;