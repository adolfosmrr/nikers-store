import ProductCarousel from '../components/ProductCarousel';
import Footer from '../components/Footer';
import ShoesStore from '../components/ShoesStore';
import SEOHelmet from '../components/SEOHelmet';

import { Link } from 'react-router-dom';

function ProductMen({ itemCar, setItemCar, setTotal, addNotification }) {
  return (
    <>

      <SEOHelmet
        title="Zapatillas para Hombres"
        description="Explora nuestra exclusiva colección de zapatillas para hombres. Encuentra los modelos más recientes y de alta calidad."
        keywords="zapatillas hombre, sneakers masculinas, calzado deportivo hombre, moda hombre"
      />
      
      <ProductCarousel Title="Hombres Sneakers" />
      <ShoesStore itemCar={itemCar} setItemCar={setItemCar} setTotal={setTotal} addNotification={addNotification} />
      <Footer />
    </>
  );
}

export default ProductMen;