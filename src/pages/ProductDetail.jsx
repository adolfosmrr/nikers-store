import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { slugify } from '../utils/slugify';
import { gsap } from "gsap/gsap-core";

function ProductDetail({ setItemCar, setTotal }) {

    const { slug } = useParams();
    const [sneaker, setSneaker] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        fetch("https://6825fe46397e48c913148b73.mockapi.io/products/v1/sneakers")
            .then(res => res.json())
            .then(data => {
                const product = data.find(item => slugify(item.name) === slug);
                setSneaker(product || null);
                setloading(false);
            })
            .catch(() => {
                setSneaker(null)
                setloading(false)
            })
    }, [slug])

    if (loading) return <p>Cargando...</p>;
    if (!sneaker) return <p>Producto no encontrado.</p>

    return (

        <section className="w-full h-screen min-h-[850px] bg-soft-white">

 
        </section>
    )

}

export default ProductDetail;