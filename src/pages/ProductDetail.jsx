import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { gsap } from "gsap/gsap-core";

function ProductDetail({ setItemCar, setTotal }) {

    const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    const { slug } = useParams();

    const [sneaker, setSneaker] = useState([]);
    const [loading, setloading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        fetch("https://6825fe46397e48c913148b73.mockapi.io/products/v1/sneakers")
            .then(response => response.json())
            .then(data => {
                const product = data.find(item => slugify(item.name) === slug);
                setSneaker(product);
                setloading(false);
            })
            .catch(error => {
                console.error("Error al cargar los datos:", error);
                setloading(false)
            })
    }, [slug])

    if (loading) return <p>Cargando...</p>;
    if (!sneaker) return <p>No se encontró la zapatilla.</p>

    const sizes = ['36', '37', '38', '39', '40', '41', '42'];

    const handleBuy = () => {
        if (!selectedSize) {
            alert("Por favor, seleccioná una talla antes de comprar.");
            return;
        }

        const price = parseFloat(sneaker.price);

        const exists = itemCar.find(
            item => item.id === sneaker.id && item.size === selectedSize
        );

        if (exists) {
            setItemCar(prev =>
                prev.map(item => {
                    if (item.id === sneaker.id && item.size === selectedSize) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                })
            );
        } else {
            setItemCar(prev => [
                ...prev,
                {
                    id: sneaker.id,
                    title: sneaker.title,
                    price: price,
                    image: sneaker.image,
                    size: selectedSize,
                    quantity: 1,
                }
            ]);
        }

        setTotal(prev => prev + price);
    };


    return (

        <section className="w-full h-screen min-h-[850px] bg-soft-white">

            <div className="w-full h-full">

                {/* Carrusel */}

                <div className="w-full h-1/2 bg-yellow-50">

                </div>

                {/* Shoes Detail */}

                <div className="w-full h-1/2 max-w-8x1 mx-auto px-2.5 py-5">

                    <div className="w-full h-full flex flex-col items-start">

                        {/* Sneaker Title */}

                        <div className="w-full">
                            <h1 className="font-advercase text-dark-grey text-4xl mb-1.5 720:text-6xl">Nike Dunk Low JP</h1>
                            <p className="font-satoshiB text-base 720:text-lg">$120.00</p>
                        </div>

                        {/* Sneaker Sizes */}

                        <div className="w-full flex gap-4">
                            {
                                sizes.map((size) => (
                                    <p className="border-2 rounded-md text-dark-grey font-satoshiB bg-soft-white border-dark-grey text-sm p-3.5 my-6 hover:bg-dark-grey hover:text-soft-white cursor-pointer">{size}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

        </section>

    )

}

export default ProductDetail;