import HomeHero from '../components/HomeHero';
import AboutUs from '../components/AboutUs';
import GenderShoes from '../components/GenderShoes';
import NewShoes from '../components/NewShoes';
import Footer from '../components/Footer';

function Home({ itemCar, setItemCar, setTotal }) {
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