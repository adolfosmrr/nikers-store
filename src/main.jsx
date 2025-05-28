import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Swiper from 'swiper';
import Lenis from 'lenis'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
