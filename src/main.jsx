import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// providers
import CartProvider from './context/CartProvider/CartProvider.jsx';
import BibliotecaProvider from './context/BibliotecaProvider/BibliotecaProvider.jsx';
import GamesProvider from './context/GamesProvider/GamesProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BibliotecaProvider>
      <CartProvider>
        <BrowserRouter>
          <GamesProvider>
            <App />
          </GamesProvider>
        </BrowserRouter>
      </CartProvider>
    </BibliotecaProvider>
  </StrictMode >,
)