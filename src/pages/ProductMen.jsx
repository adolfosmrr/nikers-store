import ProductCarousel from '../components/ProductCarousel';
import Footer from '../components/Footer';
import ShoesStore from '../components/ShoesStore';

function ProductMen({ itemCar, setItemCar, setTotal }) {
  return (
    <>
      <ProductCarousel Title="Hombres Sneakers" />
      <ShoesStore itemCar={itemCar} setItemCar={setItemCar} setTotal={setTotal}/>
      <Footer />
    </>
  );
}

export default ProductMen;