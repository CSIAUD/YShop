import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductCard } from './components/productcard';
import { Navbar } from './components/navbar';
import SlideOver from './components/sliderover';

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
                         onAddToCart={() => addToCart(product)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
