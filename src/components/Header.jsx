import gsap from "gsap";
import ProductCar from "./ProductCar";
import { Link } from 'react-router-dom';

function Header({ itemCar }) {

    const linksNames = ['Nosotros', 'Hombres', 'Mujeres'];
    const linkSrc = ['/AboutUs', '/ProductMen', '/ProductWomen']

    function showCar() {

        gsap.to('.carBg', { opacity: 1, duration: 0.3, onComplete: () => { document.querySelector('.carBg').style.pointerEvents = 'auto' } })
        gsap.to('.carWrapper', { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', delay: 0.2, ease: 'sine.inOut', duration: 0.4 })

    }

    function burgerMenuShow() {
        gsap.to('.burgerWrapper', {clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'power2.inOut', duration: 0.7})
    }

    function burgerMenuClose() {
        gsap.to('.burgerWrapper', {clipPath: 'polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)', ease: 'power2.inOut', duration: 0.7})
    }

    return (
        <header className="w-full fixed z-99 bg-black/70 backdrop-blur-sm">
            <div className="w-full px-2.5 py-3.5 max-w-8x1 mx-auto flex justify-between items-center">

                {/* Logo */}

                <div className="w-1/4">
                    <Link to="/">
                        <svg width="79" height="currentHeight" viewBox="0 0 79 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_5_1176)">
                                <path d="M18.3672 2.50167C18.3672 2.50167 17.1136 5.36964 19.2139 5.96809C19.8685 6.08713 20.6148 5.9773 21.7232 5.42488L33.7094 0L21.6395 7.70492C21.6395 7.70492 18.6343 9.82582 17.137 8.45529C15.639 7.08477 17.1852 4.14248 18.3679 2.50167" fill="#E4E4E4" />
                                <path d="M1.09933 13.0779C0.780736 12.9924 0.636163 12.7938 0.636163 12.509C0.636163 12.2532 0.751955 12.0539 1.12811 11.9973C2.43061 11.7981 4.60055 11.1727 5.78726 10.0073C5.96061 9.837 6.04763 9.80806 6.25043 9.80806C6.5108 9.80806 6.62659 9.92183 6.62659 10.1494V11.685C6.62659 11.9408 6.74238 11.9125 6.94519 11.685C8.0161 10.4907 9.26037 9.7515 10.8226 9.7515C13.9188 9.7515 16.321 11.7705 16.321 15.2106V25.5316C16.321 27.01 17.1604 27.323 17.7969 27.4651C18.1731 27.5506 18.3176 27.7492 18.3176 28.0339C18.3176 28.2897 18.1443 28.5456 17.7681 28.5456C17.3632 28.5456 16.0895 28.3752 14.1511 28.3752C12.2127 28.3752 10.6499 28.5456 10.2443 28.5456C9.86811 28.5456 9.69476 28.2897 9.69476 28.0339C9.69476 27.7498 9.83933 27.5506 10.2155 27.4651C10.852 27.323 11.6913 27.01 11.6913 25.5316V15.4947C11.6913 13.2771 11.026 12.1111 9.49195 12.1111C7.66872 12.1111 6.62726 13.8453 6.62726 16.0346V25.5309C6.62726 27.0093 7.46659 27.3224 8.10311 27.4644C8.47927 27.5499 8.62384 27.7485 8.62384 28.0333C8.62384 28.2891 8.45049 28.5449 8.07433 28.5449C7.66939 28.5449 6.10653 28.3746 4.28329 28.3746C2.22848 28.3746 0.955429 28.5449 0.550489 28.5449C0.174331 28.5449 0.000976562 28.2891 0.000976562 28.0333C0.000976562 27.7492 0.14555 27.5499 0.521709 27.4644C1.15823 27.3224 1.99756 27.0093 1.99756 25.5309V14.2715C1.99756 13.4751 1.7372 13.2482 1.10067 13.0772L1.09933 13.0779Z" fill="#E4E4E4" />
                                <path d="M25.292 27.4651C25.6682 27.5506 25.784 27.7209 25.784 28.005C25.784 28.2891 25.6394 28.5449 25.2633 28.5449C24.8583 28.5449 23.5558 28.3746 21.4434 28.3746C19.3311 28.3746 18.0868 28.5449 17.6819 28.5449C17.3057 28.5449 17.1611 28.2891 17.1611 28.005C17.1611 27.7209 17.2769 27.5499 17.6531 27.4651C18.2896 27.323 19.1577 27.01 19.1577 25.5316V13.988C19.1577 13.1916 18.8686 12.9647 18.2896 12.822C17.971 12.7365 17.7977 12.5379 17.7977 12.2249C17.7977 11.9691 17.9134 11.7698 18.2896 11.7132C19.4181 11.5429 21.7908 11.0023 22.7747 10.0356C22.9481 9.86527 23.0351 9.80806 23.2667 9.80806C23.6141 9.80806 23.7874 9.95011 23.7874 10.2631V25.5316C23.7874 27.01 24.6555 27.323 25.292 27.4651Z" fill="#E4E4E4" />
                                <path d="M43.2039 27.323C42.4516 27.0672 41.6705 26.7831 40.9757 25.7026L35.1593 16.7745C35.0723 16.6324 35.0723 16.4904 35.1881 16.3766L38.2844 13.164C39.3258 12.1118 39.9048 11.8842 41.6698 11.3726C41.9884 11.2871 42.1905 11.0885 42.1905 10.7472C42.1905 10.4059 41.9589 10.2072 41.641 10.2072C41.1203 10.2072 40.1076 10.3493 38.2261 10.3493C36.1425 10.3493 35.1586 10.2072 34.6379 10.2072C34.3488 10.2072 34.0884 10.4631 34.0884 10.8044C34.0884 11.174 34.32 11.3732 34.5803 11.4581C35.8828 11.8849 36.172 12.311 35.1593 13.3061L31.8027 16.6324C31.6293 16.8027 31.5423 16.7745 31.5423 16.5186V3.73606L26.9126 6.6915V25.3889C26.9126 26.8673 26.0733 27.1803 25.4367 27.3224C25.0606 27.4079 24.916 27.6354 24.916 27.9478C24.916 28.2319 25.0894 28.5449 25.4655 28.5449C25.7841 28.5449 27.1442 28.3746 29.1983 28.3746C31.2525 28.3746 32.6708 28.5449 32.9894 28.5449C33.3655 28.5449 33.5389 28.2319 33.5389 27.9478C33.5389 27.6347 33.3943 27.4079 33.0181 27.3224C32.3816 27.1803 31.5423 26.8673 31.5423 25.3889V20.4987C31.5423 20.2895 31.5918 20.1291 31.6895 20.0166C31.6788 20.0245 31.6688 20.0337 31.6581 20.0442L31.7157 19.9877C31.7063 19.9969 31.6976 20.0074 31.6895 20.0173C31.8241 19.9127 31.96 19.9818 32.1213 20.2724L35.7965 26.0728C36.2014 26.7265 36.1439 27.1816 35.3621 27.3809C35.0435 27.4664 34.8126 27.665 34.8126 27.978C34.8126 28.3193 35.073 28.5469 35.3916 28.5469C36.0569 28.5469 37.2148 28.3766 39.3272 28.3766C41.4396 28.3766 42.5105 28.5469 43.147 28.5469C43.5231 28.5469 43.7835 28.3193 43.7835 27.978C43.7835 27.6367 43.5519 27.4381 43.2046 27.3243L43.2039 27.323Z" fill="#E4E4E4" />
                                <path d="M31.6572 20.0442C31.6679 20.0337 31.678 20.0252 31.6887 20.0166C31.6974 20.0068 31.7054 19.9962 31.7148 19.987L31.6572 20.0436V20.0442Z" fill="#E4E4E4" />
                                <path d="M49.4552 9.7515C53.1592 9.7515 55.5902 12.4807 55.5902 16.6607C55.5902 17.7412 55.1565 18.2528 54.4905 18.2528H46.3877C46.2143 18.2528 46.1273 18.3383 46.1273 18.4521L46.0985 19.4188C46.0985 24.3945 47.7477 27.0106 50.9023 27.0106C52.3199 27.0106 53.3038 26.4135 54.3459 25.504C54.5775 25.3047 54.8666 25.2482 55.1565 25.4474C55.4168 25.6467 55.4168 25.9025 55.2722 26.1866C54.4041 27.8925 52.2335 28.973 49.7162 28.973C44.5363 28.973 41.1797 25.3054 41.1797 19.6753C41.1797 13.6763 44.45 9.75216 49.4558 9.75216L49.4552 9.7515ZM51.4518 14.1018C51.4518 12.2821 50.8152 11.3154 49.5415 11.3154C47.7765 11.3154 46.648 13.0785 46.2424 16.4049C46.2137 16.6041 46.3007 16.689 46.474 16.689H49.2229C50.8721 16.689 51.4511 15.836 51.4511 14.1018H51.4518Z" fill="#E4E4E4" />
                                <path d="M56.1101 12.7938C55.7915 12.7083 55.6469 12.5379 55.6469 12.2538C55.6469 11.998 55.7627 11.7705 56.1389 11.7139C57.2673 11.5436 59.9004 10.8892 60.798 10.008C60.9714 9.83765 61.0296 9.80872 61.2324 9.80872C61.4928 9.80872 61.6373 9.92249 61.6373 10.1783V12.2538C61.6373 12.5096 61.6949 12.5096 61.8107 12.2821C62.5342 10.8037 63.7497 9.7515 65.1961 9.7515C66.4986 9.7515 67.3667 10.6045 67.3667 11.9408C67.3667 13.1068 66.8172 13.846 65.9491 13.846C64.6178 13.846 64.5308 12.3104 63.5764 12.3104C62.8816 12.3104 62.3033 13.1068 61.8977 14.1301C61.7243 14.67 61.6373 15.2671 61.6373 15.9215V25.6737C61.6373 27.01 62.5925 27.2375 63.6921 27.4651C64.0683 27.5506 64.2129 27.7492 64.2129 28.0339C64.2129 28.2897 64.0395 28.5456 63.6634 28.5456C63.2584 28.5456 61.551 28.3752 59.294 28.3752C57.2392 28.3752 55.9662 28.5456 55.5612 28.5456C55.1851 28.5456 55.0117 28.2897 55.0117 28.0339C55.0117 27.7498 55.1563 27.5788 55.5324 27.4651C56.169 27.2947 57.0083 27.01 57.0083 25.6737V13.988C57.0083 13.1916 56.7479 12.9647 56.1114 12.7938H56.1101Z" fill="#E4E4E4" />
                                <path d="M67.5689 27.4651C67.5689 27.0383 67.6271 26.5266 67.6271 25.6171C67.6271 24.7641 67.5689 24.2525 67.5689 23.8257C67.5689 23.3706 67.8293 23.172 68.1184 23.172C68.4076 23.172 68.5816 23.3423 68.6974 23.6554C69.5367 25.9301 70.6652 27.4368 72.4884 27.4368C73.8773 27.4368 74.6878 26.6121 74.6878 25.162C74.6878 19.9305 67.251 20.5842 67.251 14.983C67.251 11.9408 69.7977 9.7515 73.3277 9.7515C75.4401 9.7515 77.6107 10.3486 77.6107 11.1733C77.6107 11.4864 77.5525 12.0263 77.5525 12.68C77.5525 13.3337 77.6107 13.7322 77.6107 14.0729C77.6107 14.3287 77.4662 14.528 77.1476 14.528C76.829 14.528 76.7132 14.3576 76.5686 14.0446C75.6429 12.0546 74.3404 11.2864 73.299 11.2864C72.1417 11.2864 71.4757 12.0256 71.4757 13.2765C71.4757 17.4275 78.9996 17.0296 78.9996 23.5975C78.9996 26.7252 76.424 29 72.8358 29C70.289 29 67.5689 28.3463 67.5689 27.4644V27.4651Z" fill="#E4E4E4" />
                            </g>
                            <defs>
                                <clipPath id="clip0_5_1176">
                                    <rect width="79" height="29" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Link>
                </div>

                {/* Navigation */}

                <div className="w-3/4 flex justify-end items-center gap-10 991:gap-14">
                    <nav>
                        <ul className="hidden 920:flex gap-8">
                            {linksNames.map((link, index) => (
                                <li key={index}><Link className="text-soft-white font-satoshiM cursor-pointer" to={linkSrc[index]}>{link}</Link></li>
                            ))}
                        </ul>
                    </nav>

                    {/* Icons */}

                    <div className="flex items-center gap-7">

                        {/* Profile Icon */}

                        <div>
                            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_5_1197)">
                                    <path d="M11.9101 5.00063C11.9101 3.27506 10.5074 1.87524 8.77551 1.87524C7.04362 1.87524 5.64095 3.2738 5.64095 5.00063C5.64095 6.72746 7.04362 8.12602 8.77551 8.12602C10.5074 8.12602 11.9101 6.72746 11.9101 5.00063ZM3.76147 5.00063C3.76147 2.23871 6.00675 0 8.77551 0C11.5443 0 13.7908 2.23871 13.7908 5.00063C13.7908 7.76255 11.5455 10.0013 8.77551 10.0013C6.00549 10.0013 3.76147 7.76129 3.76147 5.00063ZM1.93119 18.1248H15.6236C15.2755 15.6521 13.1437 13.7492 10.5692 13.7492H6.98812C4.41361 13.7492 2.28312 15.6521 1.93372 18.1248H1.92993H1.93119ZM0 18.8404C0 14.9931 3.12573 11.8752 6.98559 11.8752H10.5667C14.4253 11.8752 17.5523 14.9918 17.5523 18.8404C17.5523 19.4806 17.0313 20 16.3893 20H1.163C0.520955 20 0 19.4806 0 18.8404Z" fill="#E4E4E4" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_5_1197">
                                        <rect width="17.551" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                        {/* Car Icon */}

                        <div className="relative">

                            {/* Icon */}

                            <a className="cursor-pointer" onClick={showCar}>
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_5_1200)">
                                        <path d="M15.8344 6.32707H12.999V4.27193C12.999 1.83709 11.214 0 8.84607 0C6.47818 0 4.35597 1.99123 4.35597 4.34712V6.32707H1.55687C0.698209 6.32707 0 7.02506 0 7.88346V16.2882C0 18.3358 1.66592 20.0013 3.71417 20.0013H13.6771C15.7254 20.0013 17.3913 18.3358 17.3913 16.2882V7.88346C17.3913 7.02506 16.6931 6.32707 15.8344 6.32707ZM6.11215 4.34712C6.11215 2.9411 7.36442 1.75439 8.84733 1.75439C10.2362 1.75439 11.2453 2.81328 11.2453 4.27193V6.32707H6.11341V4.34712H6.11215ZM15.6364 16.2882C15.6364 17.3684 14.7577 18.2469 13.6771 18.2469H3.71417C2.63364 18.2469 1.75492 17.3684 1.75492 16.2882V8.08145H4.35723V10.3271C4.35723 10.812 4.74958 11.2043 5.23469 11.2043C5.7198 11.2043 6.11215 10.812 6.11215 10.3271V8.08145H11.2441V10.3271C11.2441 10.812 11.6364 11.2043 12.1215 11.2043C12.6066 11.2043 12.999 10.812 12.999 10.3271V8.08145H15.6364V16.2882Z" fill="#E4E4E4" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_5_1200">
                                            <rect width="17.3913" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>

                            {/* Badge de cantidad */}

                            {
                                itemCar.length > 0 && (
                                    <div className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold pointer-events-none">
                                        {itemCar.reduce((acc, item) => acc + item.quantity, 0)}
                                    </div>
                                )
                            }

                        </div>

                    </div>

                    {/* Burger Menu */}

                    <div className="w-8 flex flex-col justify-between gap-0.5 group cursor-pointer 920:hidden" onClick={burgerMenuShow}>
                        <div className="w-full h-px bg-soft-white"></div>
                        <div className="w-full h-px bg-soft-white"></div>
                        <div className="w-full h-px bg-soft-white transition-all duration-400 origin-right scale-x-100 group-hover:scale-x-50"></div>
                    </div>

                    {/* Burgers Links */}

                    <div className="burgerWrapper absolute bg-soft-white top-0 right-0 px-2.5 py-3.5 flex flex-col justify-between gap-10 920:hidden">
                        <div className="w-full flex justify-between items-center gap-10">

                            {/* Icons Wrapper */}

                            <div className="flex items-center gap-7 h-[29px]">

                                {/* Profile Icon */}

                                <Link>
                                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_66_2838)">
                                            <path d="M11.9101 5.00063C11.9101 3.27506 10.5074 1.87524 8.77551 1.87524C7.04362 1.87524 5.64095 3.2738 5.64095 5.00063C5.64095 6.72746 7.04362 8.12602 8.77551 8.12602C10.5074 8.12602 11.9101 6.72746 11.9101 5.00063ZM3.76147 5.00063C3.76147 2.23871 6.00675 0 8.77551 0C11.5443 0 13.7908 2.23871 13.7908 5.00063C13.7908 7.76255 11.5455 10.0013 8.77551 10.0013C6.00549 10.0013 3.76147 7.76129 3.76147 5.00063ZM1.93119 18.1248H15.6236C15.2755 15.6521 13.1437 13.7492 10.5692 13.7492H6.98812C4.41361 13.7492 2.28312 15.6521 1.93372 18.1248H1.92993H1.93119ZM0 18.8404C0 14.9931 3.12573 11.8752 6.98559 11.8752H10.5667C14.4253 11.8752 17.5523 14.9918 17.5523 18.8404C17.5523 19.4806 17.0313 20 16.3893 20H1.163C0.520955 20 0 19.4806 0 18.8404Z" fill="#333237" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_66_2838">
                                                <rect width="17.551" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </Link>

                                {/* Bag Icon */}

                                <Link>
                                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_66_2840)">
                                            <path d="M15.8344 6.32707H12.999V4.27193C12.999 1.83709 11.214 0 8.84607 0C6.47818 0 4.35597 1.99123 4.35597 4.34712V6.32707H1.55687C0.698209 6.32707 0 7.02506 0 7.88346V16.2882C0 18.3358 1.66592 20.0013 3.71417 20.0013H13.6771C15.7254 20.0013 17.3913 18.3358 17.3913 16.2882V7.88346C17.3913 7.02506 16.6931 6.32707 15.8344 6.32707ZM6.11215 4.34712C6.11215 2.9411 7.36442 1.75439 8.84733 1.75439C10.2362 1.75439 11.2453 2.81328 11.2453 4.27193V6.32707H6.11341V4.34712H6.11215ZM15.6364 16.2882C15.6364 17.3684 14.7577 18.2469 13.6771 18.2469H3.71417C2.63364 18.2469 1.75492 17.3684 1.75492 16.2882V8.08145H4.35723V10.3271C4.35723 10.812 4.74958 11.2043 5.23469 11.2043C5.7198 11.2043 6.11215 10.812 6.11215 10.3271V8.08145H11.2441V10.3271C11.2441 10.812 11.6364 11.2043 12.1215 11.2043C12.6066 11.2043 12.999 10.812 12.999 10.3271V8.08145H15.6364V16.2882Z" fill="#333237" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_66_2840">
                                                <rect width="17.3913" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </Link>

                            </div>

                            {/* Burger Icon */}

                            <div className="w-8 flex flex-col justify-between gap-0.5 group cursor-pointer 991:hidden" onClick={burgerMenuClose}>
                                <div className="w-full h-px bg-dark-grey"></div>
                                <div className="w-full h-px bg-dark-grey transiton-all duration-500 origin-right scale-x-75 group-hover:scale-x-100"></div>
                                <div className="w-full h-px bg-dark-grey transition-all duration-400 origin-right scale-x-33 group-hover:scale-x-100"></div>
                            </div>

                        </div>

                        {/* Links */}

                        <nav>
                            <ul className="">
                                {linksNames.map((link, index) => (
                                    <li key={index}><Link className="text-dark-grey font-satoshiM cursor-pointer" to={linkSrc[index]}>{link}</Link></li>
                                ))}
                            </ul>
                        </nav>

                        <a href="www.instagram.com">
                            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_66_2863)">
                                    <path d="M8.77585 5.50781C6.28525 5.50781 4.27632 7.51172 4.27632 9.99609C4.27632 12.4805 6.28525 14.4844 8.77585 14.4844C11.2665 14.4844 13.2754 12.4805 13.2754 9.99609C13.2754 7.51172 11.2665 5.50781 8.77585 5.50781ZM8.77585 12.9141C7.16636 12.9141 5.85057 11.6055 5.85057 9.99609C5.85057 8.38672 7.16245 7.07812 8.77585 7.07812C10.3893 7.07812 11.7011 8.38672 11.7011 9.99609C11.7011 11.6055 10.3853 12.9141 8.77585 12.9141ZM14.5089 5.32422C14.5089 5.90625 14.039 6.37109 13.4594 6.37109C12.8759 6.37109 12.4099 5.90234 12.4099 5.32422C12.4099 4.74609 12.8799 4.27734 13.4594 4.27734C14.039 4.27734 14.5089 4.74609 14.5089 5.32422ZM17.489 6.38672C17.4225 4.98438 17.1014 3.74219 16.0714 2.71875C15.0454 1.69531 13.8001 1.375 12.3943 1.30469C10.9453 1.22266 6.60245 1.22266 5.15352 1.30469C3.75157 1.37109 2.50627 1.69141 1.47635 2.71484C0.446436 3.73828 0.129237 4.98047 0.0587479 6.38281C-0.0234889 7.82812 -0.0234889 12.1602 0.0587479 13.6055C0.125321 15.0078 0.446436 16.25 1.47635 17.2734C2.50627 18.2969 3.74766 18.6172 5.15352 18.6875C6.60245 18.7695 10.9453 18.7695 12.3943 18.6875C13.8001 18.6211 15.0454 18.3008 16.0714 17.2734C17.0974 16.25 17.4186 15.0078 17.489 13.6055C17.5713 12.1602 17.5713 7.83203 17.489 6.38672ZM15.6172 15.1562C15.3117 15.9219 14.7204 16.5117 13.9489 16.8203C12.7937 17.2773 10.0525 17.1719 8.77585 17.1719C7.49923 17.1719 4.75408 17.2734 3.60276 16.8203C2.83522 16.5156 2.2439 15.9258 1.93453 15.1562C1.47635 14.0039 1.58209 11.2695 1.58209 9.99609C1.58209 8.72266 1.48027 5.98438 1.93453 4.83594C2.23998 4.07031 2.8313 3.48047 3.60276 3.17187C4.758 2.71484 7.49923 2.82031 8.77585 2.82031C10.0525 2.82031 12.7976 2.71875 13.9489 3.17187C14.7165 3.47656 15.3078 4.06641 15.6172 4.83594C16.0754 5.98828 15.9696 8.72266 15.9696 9.99609C15.9696 11.2695 16.0754 14.0078 15.6172 15.1562Z" fill="#333237" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_66_2863">
                                        <rect width="17.5439" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header;