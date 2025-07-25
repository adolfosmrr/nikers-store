import ProductCarousel from '../components/ProductCarousel';
import Footer from '../components/Footer';
import ShoesStore from '../components/ShoesStore';
import SEOHelmet from '../components/SEOHelmet';

function ProductWomen({ itemCar, setItemCar, setTotal, addNotification }) {
  return (
    <>

      <SEOHelmet
        title="Zapatillas para Mujeres"
        description="Explora nuestra exclusiva colección de zapatillas para mujeres. Encuentra los modelos más recientes y de alta calidad."
        keywords="zapatillas mujer, sneakers femeninos, calzado deportivo mujer, moda mujer"
      />

      <ProductCarousel Title='Mujeres Sneakers' />
      <ShoesStore itemCar={itemCar} setItemCar={setItemCar} setTotal={setTotal} addNotification={addNotification} />
      <Footer />
    </>
  );
}

export default ProductWomen;