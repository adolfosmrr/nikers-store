import ProductCarousel from '../components/ProductCarousel';
import Footer from '../components/Footer';
import ShoesStore from '../components/ShoesStore';

function ProductWomen({ setItemCar, setTotal }) {
  return (
    <>
      <ProductCarousel Title='Mujeres Sneakers'/>
      <ShoesStore />
      <Footer />
    </>
  );
}

export default ProductWomen;