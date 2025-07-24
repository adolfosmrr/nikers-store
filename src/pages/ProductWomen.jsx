import ProductCarousel from '../components/ProductCarousel';
import Footer from '../components/Footer';
import ShoesStore from '../components/ShoesStore';

function ProductWomen({ itemCar, setItemCar, setTotal, addNotification }) {
  return (
    <>
      <ProductCarousel Title='Mujeres Sneakers'/>
      <ShoesStore itemCar={itemCar} setItemCar={setItemCar} setTotal={setTotal} addNotification={addNotification} />
      <Footer />
    </>
  );
}

export default ProductWomen;