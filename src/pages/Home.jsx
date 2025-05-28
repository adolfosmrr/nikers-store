import HomeHero from '../components/HomeHero';
import AboutUs from '../components/AboutUs';
import GenderShoes from '../components/GenderShoes';
import NewShoes from '../components/NewShoes';
import Footer from '../components/Footer';

function Home({ setItemCar, setTotal }) {
  return (
    <>
      <HomeHero />
      <AboutUs />
      <GenderShoes />
      <NewShoes setItemCar={setItemCar} setTotal={setTotal} />
      <Footer />
    </>
  );
}

export default Home;