import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import logo from './assets/logo_nobg.png'

// Set favicon dynamically to bundled logo asset
function FaviconSetter() {
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = logo;
  }, []);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FaviconSetter />
    <App />
  </StrictMode>,
)
