import HomeHero from '../components/HomeHero';
import AboutUs from '../components/AboutUs';
import GenderShoes from '../components/GenderShoes';
import NewShoes from '../components/NewShoes';
import Footer from '../components/Footer';
import SEOHelmet from '../components/SEOHelmet';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Home({ itemCar, setItemCar, setTotal }) {

  <SEOHelmet
    title="Inicio"
    description="Bienvenido a Nikers, tu tienda online de zapatillas premium. Descubre las últimas tendencias y colecciones exclusivas."
    keywords="zapatillas, sneakers, tienda, online, moda, nuevas colecciones"
  />

  const location = useLocation();

  useEffect(() => {
    const scrollToSection = () => {
      // Scroll por hash (#nosotros)
      if (location.hash) {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Scroll por query param (?scrollTo=nosotros)
      const params = new URLSearchParams(location.search);
      const section = params.get('scrollTo');
      if (section) {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Delay para que los componentes estén montados
    setTimeout(scrollToSection, 100);
  }, [location]);

  return (
    <>
      <HomeHero />
      <AboutUs />
      <GenderShoes />
      <NewShoes itemCar={itemCar} setItemCar={setItemCar} setTotal={setTotal} />
      <Footer />
    </>
  );
}

export default Home;