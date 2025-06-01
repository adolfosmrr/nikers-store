import { useState } from "react";
import gsap from "gsap";

function ProductCar({ itemCar, setItemCar, total, setTotal }) {

    const [number, setNumber] = useState(1)

    {/* Función para eliminar producto del carrito */ }

    function removeItem(id) {
        const itemToRemove = itemCar.find(item => item.id === id);

        if (itemToRemove) {
            const priceNumber = parseFloat(itemToRemove.newShoesPrice.replace('$', ''));
            setTotal(prev => prev - priceNumber);
            setItemCar(prev => prev.filter(item => item.id !== id));
        }
    }

    function increaseItem(id) {
        setItemCar(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    setTotal(prevTotal => prevTotal + parseFloat(item.newShoesPrice.replace('$', '')))
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        });
    }

    function decreaseItem(id) {
        const itemToUpdate = itemCar.find(item => item.id === id);

        if (!itemToUpdate) return;

        const price = parseFloat(itemToUpdate.newShoesPrice.replace('$', ''));

        if (itemToUpdate.quantity === 1) {
            removeItem(id);
        } else {
            // Primero actualizás el carrito
            setItemCar(prev =>
                prev.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                })
            );

            // Después actualizás el total
            setTotal(prev => prev - price);
        }
    }

    function closeCar() {
        gsap.to('.carWrapper', { clipPath: 'polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)', ease: 'sine.inOut', duration: 0.4 })
        gsap.to('.carBg', { opacity: 0, delay: 0.4, duration: 0.2, onComplete: () => { document.querySelector('.carBg').style.pointerEvents = 'none' } })
    }

    return (

        <div className="carBg fixed z-999999 bg-black/70 backdrop-blur-sm w-full h-screen opacity-0 pointer-events-none">
            <div className="w-full h-screen max-w-8x1 mx-auto px-2.5 tabletScreen:px-10 deskScreen:px-2.5 flex justify-between items-start py-3.5">

                {/* Logo */}

                <div>
                    <svg width="79" height="29" viewBox="0 0 79 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_52_1561)">
                            <path d="M18.3667 2.50167C18.3667 2.50167 17.1131 5.36964 19.2134 5.96809C19.868 6.08713 20.6143 5.9773 21.7227 5.42488L33.7089 0L21.639 7.70492C21.639 7.70492 18.6338 9.82582 17.1365 8.45529C15.6386 7.08477 17.1847 4.14248 18.3674 2.50167" fill="#E4E4E4" />
                            <path d="M1.09982 13.0779C0.781224 12.9924 0.636651 12.7938 0.636651 12.509C0.636651 12.2532 0.752443 12.0539 1.1286 11.9973C2.4311 11.7981 4.60104 11.1727 5.78775 10.0073C5.9611 9.837 6.04811 9.80806 6.25092 9.80806C6.51128 9.80806 6.62708 9.92183 6.62708 10.1494V11.685C6.62708 11.9408 6.74287 11.9125 6.94567 11.685C8.01659 10.4907 9.26086 9.7515 10.8231 9.7515C13.9193 9.7515 16.3215 11.7705 16.3215 15.2106V25.5316C16.3215 27.01 17.1609 27.323 17.7974 27.4651C18.1735 27.5506 18.3181 27.7492 18.3181 28.0339C18.3181 28.2897 18.1448 28.5456 17.7686 28.5456C17.3637 28.5456 16.0899 28.3752 14.1516 28.3752C12.2132 28.3752 10.6504 28.5456 10.2448 28.5456C9.8686 28.5456 9.69525 28.2897 9.69525 28.0339C9.69525 27.7498 9.83982 27.5506 10.216 27.4651C10.8525 27.323 11.6918 27.01 11.6918 25.5316V15.4947C11.6918 13.2771 11.0265 12.1111 9.49244 12.1111C7.66921 12.1111 6.62775 13.8453 6.62775 16.0346V25.5309C6.62775 27.0093 7.46708 27.3224 8.1036 27.4644C8.47976 27.5499 8.62433 27.7485 8.62433 28.0333C8.62433 28.2891 8.45098 28.5449 8.07482 28.5449C7.66988 28.5449 6.10701 28.3746 4.28378 28.3746C2.22897 28.3746 0.955917 28.5449 0.550978 28.5449C0.174819 28.5449 0.00146484 28.2891 0.00146484 28.0333C0.00146484 27.7492 0.146038 27.5499 0.522197 27.4644C1.15872 27.3224 1.99805 27.0093 1.99805 25.5309V14.2715C1.99805 13.4751 1.73768 13.2482 1.10116 13.0772L1.09982 13.0779Z" fill="#E4E4E4" />
                            <path d="M25.2916 27.4651C25.6677 27.5506 25.7835 27.7209 25.7835 28.005C25.7835 28.2891 25.6389 28.5449 25.2628 28.5449C24.8578 28.5449 23.5553 28.3746 21.443 28.3746C19.3306 28.3746 18.0863 28.5449 17.6814 28.5449C17.3052 28.5449 17.1606 28.2891 17.1606 28.005C17.1606 27.7209 17.2764 27.5499 17.6526 27.4651C18.2891 27.323 19.1572 27.01 19.1572 25.5316V13.988C19.1572 13.1916 18.8681 12.9647 18.2891 12.822C17.9705 12.7365 17.7972 12.5379 17.7972 12.2249C17.7972 11.9691 17.913 11.7698 18.2891 11.7132C19.4176 11.5429 21.7903 11.0023 22.7742 10.0356C22.9476 9.86527 23.0346 9.80806 23.2662 9.80806C23.6136 9.80806 23.7869 9.95011 23.7869 10.2631V25.5316C23.7869 27.01 24.655 27.323 25.2916 27.4651Z" fill="#E4E4E4" />
                            <path d="M43.2039 27.323C42.4516 27.0672 41.6705 26.7831 40.9757 25.7026L35.1593 16.7745C35.0723 16.6324 35.0723 16.4904 35.1881 16.3766L38.2844 13.164C39.3258 12.1118 39.9048 11.8842 41.6698 11.3726C41.9884 11.2871 42.1905 11.0885 42.1905 10.7472C42.1905 10.4059 41.9589 10.2072 41.641 10.2072C41.1203 10.2072 40.1076 10.3493 38.2261 10.3493C36.1425 10.3493 35.1586 10.2072 34.6379 10.2072C34.3488 10.2072 34.0884 10.4631 34.0884 10.8044C34.0884 11.174 34.32 11.3732 34.5803 11.4581C35.8828 11.8849 36.172 12.311 35.1593 13.3061L31.8027 16.6324C31.6293 16.8027 31.5423 16.7745 31.5423 16.5186V3.73606L26.9126 6.6915V25.3889C26.9126 26.8673 26.0733 27.1803 25.4367 27.3224C25.0606 27.4079 24.916 27.6354 24.916 27.9478C24.916 28.2319 25.0894 28.5449 25.4655 28.5449C25.7841 28.5449 27.1442 28.3746 29.1983 28.3746C31.2525 28.3746 32.6708 28.5449 32.9894 28.5449C33.3655 28.5449 33.5389 28.2319 33.5389 27.9478C33.5389 27.6347 33.3943 27.4079 33.0181 27.3224C32.3816 27.1803 31.5423 26.8673 31.5423 25.3889V20.4987C31.5423 20.2895 31.5918 20.1291 31.6895 20.0166C31.6788 20.0245 31.6688 20.0337 31.6581 20.0442L31.7157 19.9877C31.7063 19.9969 31.6976 20.0074 31.6895 20.0173C31.8241 19.9127 31.96 19.9818 32.1213 20.2724L35.7965 26.0728C36.2014 26.7265 36.1439 27.1816 35.3621 27.3809C35.0435 27.4664 34.8126 27.665 34.8126 27.978C34.8126 28.3193 35.073 28.5469 35.3916 28.5469C36.0569 28.5469 37.2148 28.3766 39.3272 28.3766C41.4396 28.3766 42.5105 28.5469 43.147 28.5469C43.5231 28.5469 43.7835 28.3193 43.7835 27.978C43.7835 27.6367 43.5519 27.4381 43.2046 27.3243L43.2039 27.323Z" fill="#E4E4E4" />
                            <path d="M31.6577 20.0442C31.6684 20.0337 31.6785 20.0252 31.6892 20.0166C31.6979 20.0068 31.7059 19.9962 31.7153 19.987L31.6577 20.0436V20.0442Z" fill="#E4E4E4" />
                            <path d="M49.4547 9.7515C53.1587 9.7515 55.5897 12.4807 55.5897 16.6607C55.5897 17.7412 55.156 18.2528 54.49 18.2528H46.3872C46.2138 18.2528 46.1268 18.3383 46.1268 18.4521L46.098 19.4188C46.098 24.3945 47.7473 27.0106 50.9018 27.0106C52.3194 27.0106 53.3033 26.4135 54.3454 25.504C54.577 25.3047 54.8662 25.2482 55.156 25.4474C55.4163 25.6467 55.4163 25.9025 55.2718 26.1866C54.4036 27.8925 52.233 28.973 49.7157 28.973C44.5358 28.973 41.1792 25.3054 41.1792 19.6753C41.1792 13.6763 44.4495 9.75216 49.4554 9.75216L49.4547 9.7515ZM51.4513 14.1018C51.4513 12.2821 50.8147 11.3154 49.541 11.3154C47.776 11.3154 46.6476 13.0785 46.2419 16.4049C46.2132 16.6041 46.3002 16.689 46.4735 16.689H49.2224C50.8716 16.689 51.4506 15.836 51.4506 14.1018H51.4513Z" fill="#E4E4E4" />
                            <path d="M56.1101 12.7938C55.7915 12.7083 55.6469 12.5379 55.6469 12.2538C55.6469 11.998 55.7627 11.7705 56.1389 11.7139C57.2673 11.5436 59.9004 10.8892 60.798 10.008C60.9714 9.83765 61.0296 9.80872 61.2324 9.80872C61.4928 9.80872 61.6373 9.92249 61.6373 10.1783V12.2538C61.6373 12.5096 61.6949 12.5096 61.8107 12.2821C62.5342 10.8037 63.7497 9.7515 65.1961 9.7515C66.4986 9.7515 67.3667 10.6045 67.3667 11.9408C67.3667 13.1068 66.8172 13.846 65.9491 13.846C64.6178 13.846 64.5308 12.3104 63.5764 12.3104C62.8816 12.3104 62.3033 13.1068 61.8977 14.1301C61.7243 14.67 61.6373 15.2671 61.6373 15.9215V25.6737C61.6373 27.01 62.5925 27.2375 63.6921 27.4651C64.0683 27.5506 64.2129 27.7492 64.2129 28.0339C64.2129 28.2897 64.0395 28.5456 63.6634 28.5456C63.2584 28.5456 61.551 28.3752 59.294 28.3752C57.2392 28.3752 55.9662 28.5456 55.5612 28.5456C55.1851 28.5456 55.0117 28.2897 55.0117 28.0339C55.0117 27.7498 55.1563 27.5788 55.5324 27.4651C56.169 27.2947 57.0083 27.01 57.0083 25.6737V13.988C57.0083 13.1916 56.7479 12.9647 56.1114 12.7938H56.1101Z" fill="#E4E4E4" />
                            <path d="M67.5694 27.4651C67.5694 27.0383 67.6276 26.5266 67.6276 25.6171C67.6276 24.7641 67.5694 24.2525 67.5694 23.8257C67.5694 23.3706 67.8298 23.172 68.1189 23.172C68.408 23.172 68.5821 23.3423 68.6979 23.6554C69.5372 25.9301 70.6657 27.4368 72.4889 27.4368C73.8777 27.4368 74.6883 26.6121 74.6883 25.162C74.6883 19.9305 67.2515 20.5842 67.2515 14.983C67.2515 11.9408 69.7982 9.7515 73.3282 9.7515C75.4406 9.7515 77.6112 10.3486 77.6112 11.1733C77.6112 11.4864 77.553 12.0263 77.553 12.68C77.553 13.3337 77.6112 13.7322 77.6112 14.0729C77.6112 14.3287 77.4666 14.528 77.148 14.528C76.8295 14.528 76.7137 14.3576 76.5691 14.0446C75.6434 12.0546 74.3409 11.2864 73.2995 11.2864C72.1422 11.2864 71.4762 12.0256 71.4762 13.2765C71.4762 17.4275 79.0001 17.0296 79.0001 23.5975C79.0001 26.7252 76.4245 29 72.8363 29C70.2895 29 67.5694 28.3463 67.5694 27.4644V27.4651Z" fill="#E4E4E4" />
                        </g>
                        <defs>
                            <clipPath id="clip0_52_1561">
                                <rect width="79" height="29" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                {/* Car */}

                <div className="carWrapper w-1/3 max-h-full h-fit bg-soft-white pt-5 rounded-sm flex flex-col">

                    {/* Top Items */}

                    <div className="w-full flex justify-between items-center mb-7 px-5">

                        {/* Profile Icon */}

                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
                            <g clip-path="url(#clip0_52_1497)">
                                <path d="M11.9101 5.00063C11.9101 3.27506 10.5074 1.87524 8.77551 1.87524C7.04362 1.87524 5.64095 3.2738 5.64095 5.00063C5.64095 6.72746 7.04362 8.12602 8.77551 8.12602C10.5074 8.12602 11.9101 6.72746 11.9101 5.00063ZM3.76147 5.00063C3.76147 2.23871 6.00675 0 8.77551 0C11.5443 0 13.7908 2.23871 13.7908 5.00063C13.7908 7.76255 11.5455 10.0013 8.77551 10.0013C6.00549 10.0013 3.76147 7.76129 3.76147 5.00063ZM1.93119 18.1248H15.6236C15.2755 15.6521 13.1437 13.7492 10.5692 13.7492H6.98812C4.41361 13.7492 2.28312 15.6521 1.93372 18.1248H1.92993H1.93119ZM0 18.8404C0 14.9931 3.12573 11.8752 6.98559 11.8752H10.5667C14.4253 11.8752 17.5523 14.9918 17.5523 18.8404C17.5523 19.4806 17.0313 20 16.3893 20H1.163C0.520955 20 0 19.4806 0 18.8404Z" fill="#333237" />
                            </g>
                            <defs>
                                <clipPath id="clip0_52_1497">
                                    <rect width="17.551" height="20" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        {/* Close Button */}

                        <div className="size-6 bg-dark-grey flex justify-center items-center rounded-full group cursor-pointer" onClick={closeCar}>
                            <div className="w-2.5 h-0.5 bg-soft-white group-hover:w-full transition-all"></div>
                        </div>

                    </div>

                    {/* Items Products */}

                    <div className="p-3.5 w-full flex-1 min-h-0 overflow-y-auto flex flex-col justify-start items-center gap-2">
                        {
                            itemCar.length > 0 ?
                                itemCar.map((item) => (
                                    <div key={item.id} className="w-full p-5 bg-[#D9D9D9] flex flex-col justify-between gap-4 rounded-2xl">
                                        <h1 className='font-advercase text-3xl text-dark-grey'>{item.newShoesTitle}</h1>
                                        <div className="w-full">
                                            <img src={item.shoesImage} alt="" />
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <p className="font-satoshiB text-lg">{item.newShoesPrice}</p>
                                            <div className="flex gap-7.5 items-center">

                                                {/* Plus Icon */}

                                                <div className="size-6 bg-dark-grey flex justify-center items-center rounded-full cursor-pointer relative transition-all duration-300  hover:rotate-180" onClick={() => increaseItem(item.id)}>
                                                    <div className="w-0.5 h-2.5 bg-soft-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                                    <div className="w-2.5 h-0.5 bg-soft-white"></div>
                                                </div>

                                                {/* Number of sneakers */}

                                                <p className="font-satoshiB text-dark-grey text-base">{item.quantity}</p>

                                                {/* Delet Icon */}

                                                <div className="size-6 bg-dark-grey flex justify-center items-center rounded-full group cursor-pointer" onClick={() => decreaseItem(item.id)}>
                                                    <div className="w-2.5 h-0.5 bg-soft-white group-hover:w-full transition-all"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)) :

                                <p className="text-dark-grey font-satoshiB">Carrito Vacío</p>
                        }
                    </div>

                    {/* Total Info & Pay Button */}

                    <div>

                        {/* Total Info */}

                        <div className="w-full py-3.5 border-t-1 border-t-dark-grey px-5 flex justify-between items-center">
                            <h3 className="font-satoshiB text-lg">Total</h3>
                            <p className="font-satoshiB text-lg">
                                ${
                                    total
                                }
                            </p>
                        </div>

                        {/* Pay Button */}

                        <div className="w-full py-3.5 border-t-1 border-t-dark-grey px-5 flex justify-between items-center bg-dark-grey rounded-br-sm rounded-bl-sm">
                            <p className="font-advercase text-soft-white text-lg">Pagar</p>
                            <div className="cursor-pointer">
                                <svg width="33" height="16" viewBox="0 0 33 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M32.7071 8.70711C33.0976 8.31659 33.0976 7.68342 32.7071 7.2929L26.3431 0.928937C25.9526 0.538413 25.3195 0.538413 24.9289 0.928937C24.5384 1.31946 24.5384 1.95263 24.9289 2.34315L30.5858 8.00001L24.9289 13.6569C24.5384 14.0474 24.5384 14.6805 24.9289 15.0711C25.3195 15.4616 25.9526 15.4616 26.3431 15.0711L32.7071 8.70711ZM0 8L-9.65621e-08 9L32 9.00001L32 8.00001L32 7.00001L9.65612e-08 7L0 8Z" fill="#E4E4E4" />
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )

}

export default ProductCar;