import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import ProductCar from './components/ProductCar';

import Home from './pages/Home';
import AboutUs from './components/AboutUs';
import ProductMen from './pages/ProductMen';
import ProductWomen from './pages/ProductWomen';
import ProductDetail from './pages/ProductDetail';

function App() {
  const [itemCar, setItemCar] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem('cart');

    if (data) {
      try {
        const parsed = JSON.parse(data);
        const now = new Date();
        const expires = new Date(parsed.expires_at);

        if (expires > now && Array.isArray(parsed.cart)) {

          const cartWithDefaults = parsed.cart.map(item => ({
            ...item,
            quantity: item.quantity ?? 1
          }));

          setItemCar(cartWithDefaults);

          const total = cartWithDefaults.reduce((acc, item) => {
            const price = parseFloat(item.newShoesPrice?.replace('$', '') || 0);
            return acc + price * item.quantity;
          }, 0);

          setTotal(total);
        } else {
          localStorage.removeItem('cart');
        }
      } catch (error) {
        console.error("Error al parsear el carrito desde localStorage:", error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  useEffect(() => {
    if (!Array.isArray(itemCar) || itemCar.length === 0) {
      localStorage.removeItem('cart');
      return;
    }
    const data = {
      timestamp: new Date(),
      expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 horas
      cart: itemCar,
    };
    localStorage.setItem('cart', JSON.stringify(data));
  }, [itemCar]);


  return (
    <BrowserRouter>
      <ProductCar itemCar={itemCar} setItemCar={setItemCar} total={total} setTotal={setTotal} />
      <Header itemCar={itemCar} />

      <Routes>
        <Route path="/" element={<Home itemCar={itemCar} setItemCar={setItemCar} setTotal={setTotal} />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ProductMen" element={<ProductMen />} />
        <Route path="/ProductWomen" element={<ProductWomen />} />
        <Route path='/sneakers/:slug' element={<ProductDetail setItemCar={setItemCar} setTotal={setTotal} />}></Route>
      </Routes>
    </BrowserRouter>
    // <ProductDetail />
  );
}

export default App;