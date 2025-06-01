import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { stories } from "../assets/data";

function NewShoes({ itemCar, setItemCar, setTotal }) {

    const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    const navigate = useNavigate();

    return (

        <section className="w-full h-full bg-soft-white py-5">

            <div className="max-w-8x1 mx-auto px-2.5">

                {/* Title */}

                <div className="w-full flex justify-between items-end mx-auto mb-5">
                    <h1 className="text-dark-grey text-xl text-nowrap pr-7 font-advercase" >Nuevos Sneakers</h1>
                    <div className="w-[100%] h-[2px] bg-dark-grey"></div>
                    <a className="text-dark-grey font-satoshiB text-nowrap text-base pl-7">ver todos</a>
                </div>

                {/* Shoes Items */}

                <div className="w-full max-w-8x1 mx-auto grid grid-cols-1 720:grid-cols-2 991:grid-cols-3 grid-rows-2 auto-rows-ft gap-2.5">
                    {
                        stories.map((item) => {

                            const priceNumber = parseFloat(item.newShoesPrice.replace('$', ''));

                            return (
                                <div key={item.id} className="w-full p-2.5 deskScreen:p-5 relative rounded-2xl overflow-hidden group">

                                    {/* Items Background */}

                                    <div className="w-full h-full absolute top-0 left-0">
                                        <img src={item.storyBg} className="z- w-full h-full object-cover transition-all group-hover:rotate-12 group-hover:scale-150" />
                                        <div className="bg-black/50 w-full h-full absolute z-1 top-0 left-0 backdrop-blur-xs"></div>
                                    </div>

                                    {/* Item Content */}

                                    <div className="relative z-2 p-5 flex flex-col justify-between w-full h-full">
                                        <h2 className="font-advercase text-soft-white text-xl tabletScreen:text-2xl deskScreen:text-3xl max-w-full text-balance h-1/3">{item.newShoesTitle}</h2>
                                        <img src={item.shoesImage} className="w-4/5 mx-auto mb-6" />
                                        <div className="flex justify-between items-center">
                                            <p className="text-base tabletScreen:text-lg deskScreen:text-xl text-soft-white font-satoshiB">{item.newShoesPrice}</p>
                                            <div className="flex justify-between items-center gap-3.5">
                                                <div className="add size-[20px] deskScreen:size-[25px] bg-soft-white rounded-full flex justify-center items-center relative transition-all hover:rotate-180 cursor-pointer"
                                                    onClick={() => {

                                                        const exists = itemCar.find((shoe) => shoe.id === item.id);

                                                        if (exists) {
                                                            
                                                            setItemCar((prev) =>
                                                                prev.map((shoe) => {
                                                                    if (shoe.id === item.id) {
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
                                                                    shoesImage: item.shoesImage,
                                                                    newShoesTitle: item.newShoesTitle,
                                                                    priceUnitario: priceNumber, 
                                                                    quantity: 1,
                                                                },
                                                            ]);
                                                        }

                                                        
                                                        setTotal((prev) => prev + priceNumber);
                                                    }}
                                                >
                                                    <div className="w-2.5 h-0.5 bg-dark-grey"></div>
                                                    <div className="w-0.5 h-2.5 bg-dark-grey absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"></div>
                                                </div>
                                                <a href={item.linkSrc} className="px-4 py-2 deskScreen:px-5 bg-soft-white rounded-sm cursor-pointer text-sm font-advercase text-dark-grey" onClick={() => navigate(`/product/${slugify(item.newShoesTitle)}`)}>{item.linkLabel}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>

    )
}

export default NewShoes;