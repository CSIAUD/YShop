import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { ProductCard } from './components/productcard';
import { Navbar } from './components/navbar';
import SlideOver from './components/sliderover';
import Login from './components/auth/login'; // Assurez-vous d'importer vos nouveaux composants
import Register from './components/auth/register'; // Assurez-vous d'importer vos nouveaux composants

// Votre constante initialProducts et fonction App() restent inchangées jusqu'à `return (...)`

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  function getProducts() {
    axios
      .get('http://localhost:8080/api/products')
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.error('La requête a échoué avec le code de statut:', response.status);
        }
      })
      .catch((error) => {
        console.error('Une erreur s\'est produite lors de la requête:', error);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  const toggleSlideOver = () => {
    setIsSlideOverOpen(!isSlideOverOpen);
  };

  return (
    <div>
      <Navbar cart={cart} onCartClick={toggleSlideOver} />
      {isSlideOverOpen && <SlideOver cart={cart} setCart={setCart} />}
      <Routes>
        <Route
          path="/"
          element={(
            <div className="container mx-auto p-4">
              <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    id={product.id}
                    description={product.description}
                    imageUrl={product.imageUrl}
                    price={product.price}
                    accessibility={product.accebility}
                    freestyle={product.freestyle}
                    powder={product.poudre}
                    piste={product.piste}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            </div>
          )}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
