import ProductCarousel from '../components/ProductCarousel';
import Footer from '../components/Footer';
import ShoesStore from '../components/ShoesStore';

function ProductMen({ setItemCar, setTotal }) {
  return (
    <>
      <ProductCarousel Title="Hombres Sneakers" />
      <ShoesStore />
      <Footer />
    </>
  );
}

export default ProductMen;