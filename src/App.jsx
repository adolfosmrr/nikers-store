import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import Header from './components/Header';
import ProductCar from './components/ProductCar';
import NotificationsContainer from './components/NotificationsContainer';
import ScrollToTop from './hooks/ScrollToTop';

import Home from './pages/Home';
import AboutUs from './components/AboutUs';
import ProductMen from './pages/ProductMen';
import ProductWomen from './pages/ProductWomen';
import ProductDetail from './pages/ProductDetail';
import NewShoes from './components/NewShoes';
import ShoesStore from './components/ShoesStore';
import ReactLenis from 'lenis/react';
import Lenis from 'lenis';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute'; 
import AdminDashboard from './pages/AdminDashboard';

function App() {

  const [itemCar, setItemCar] = useState([]);
  const [total, setTotal] = useState(0);
  const [notifications, setNotifications] = useState([])

  const addGlobalNotification = (notificationData) => {
    setNotifications(prevNotifications => {

      const MAX_NOTIFICATIONS = 4

      const newNotifications = [{ id: Date.now(), ...notificationData }, ...prevNotifications]

      return newNotifications.slice(0, MAX_NOTIFICATIONS);
    })
  }

  const removeGlobalNotification = (idToRemove) => {
    setNotifications(prevNotifications => prevNotifications.filter(notif => notif.id !== idToRemove))
  }

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

          /* const total = cartWithDefaults.reduce((acc, item) => {
            const price = parseFloat(item.newShoesPrice?.replace('$', '') || 0);
            return acc + price * item.quantity;
          }, 0); */

          const total = cartWithDefaults.reduce((acc, item) => {
            return acc + (item.priceUnitario || 0) * item.quantity;
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
      <ScrollToTop />
      <Header itemCar={itemCar} />
      <ProductCar itemCar={itemCar} setItemCar={setItemCar} total={total} setTotal={setTotal} />
      <NotificationsContainer notifications={notifications} removeGlobalNotification={removeGlobalNotification} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ProductMen" element={<ProductMen itemCar={itemCar} setItemCar={setItemCar} setTotal={setTotal} addNotification={addGlobalNotification} />} />
        <Route path="/ProductWomen" element={<ProductWomen itemCar={itemCar} setItemCar={setItemCar} setTotal={setTotal} addNotification={addGlobalNotification} />} />
        <Route path="/sneakers/:slug" element={<ProductDetail itemCar={itemCar} setItemCar={setItemCar} setTotal={setTotal} addNotification={addGlobalNotification} />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} /> 
        </Route>
        <Route element={<PrivateRoute allowedRoles={['admin', 'user']} />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;