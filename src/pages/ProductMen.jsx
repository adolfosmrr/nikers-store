import ProductCarousel from '../components/ProductCarousel';
import Footer from '../components/Footer';
import ShoesStore from '../components/ShoesStore';

import { Link } from 'react-router-dom';

function ProductMen({ itemCar, setItemCar, setTotal, addNotification }) {
  return (
    <>
      <ProductCarousel Title="Hombres Sneakers" />
      <ShoesStore itemCar={itemCar} setItemCar={setItemCar} setTotal={setTotal} addNotification={addNotification} />
      <Footer />
    </>
  );
}

export default ProductMen;