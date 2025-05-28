import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header';
import ProductCar from './components/ProductCar';

import Home from './pages/Home';
import AboutUs from './components/AboutUs';
import ProductMen from './pages/ProductMen';
import ProductWomen from './pages/ProductWomen';

function App() {
  const [itemCar, setItemCar] = useState([]);
  const [total, setTotal] = useState(0);

  return (
    <BrowserRouter>
      <ProductCar itemCar={itemCar} setItemCar={setItemCar} total={total} setTotal={setTotal} />
      <Header itemCar={itemCar} />

      <Routes>
        <Route path="/" element={<Home setItemCar={setItemCar} setTotal={setTotal} />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ProductMen" element={<ProductMen />} />
        <Route path="/ProductWomen" element={<ProductWomen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;