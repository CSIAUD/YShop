import React from 'react';
import {ProductCard} from "./components/productcard";
import {Navbar} from "./components/navbar";

const App = () => {
    const products = [
        { id: 1, title: 'Produit 1', description: 'Description du produit 1', imageUrl: 'https://source.unsplash.com/random/200x200?product-1' },
        { id: 2, title: 'Produit 2', description: 'Description du produit 2', imageUrl: 'https://source.unsplash.com/random/200x200?product-2' },
        { id: 3, title: 'Produit 3', description: 'Description du produit 3', imageUrl: 'https://source.unsplash.com/random/200x200?product-3' },
        { id: 4, title: 'Produit 4', description: 'Description du produit 4', imageUrl: 'https://source.unsplash.com/random/200x200?product-4' },
        { id: 5, title: 'Produit 5', description: 'Description du produit 5', imageUrl: 'https://source.unsplash.com/random/200x200?product-5' },
        { id: 6, title: 'Produit 6', description: 'Description du produit 6', imageUrl: 'https://source.unsplash.com/random/200x200?product-6' },
        { id: 7, title: 'Produit 7', description: 'Description du produit 7', imageUrl: 'https://source.unsplash.com/random/200x200?product-7' },
        { id: 8, title: 'Produit 8', description: 'Description du produit 8', imageUrl: 'https://source.unsplash.com/random/200x200?product-8' },
        { id: 9, title: 'Produit 9', description: 'Description du produit 9', imageUrl: 'https://source.unsplash.com/random/200x200?product-9' },
        { id: 10, title: 'Produit 10', description: 'Description du produit 10', imageUrl: 'https://source.unsplash.com/random/200x200?product-10' }
    ];


    return (
      <div>
        <Navbar />
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-3 gap-4">
            {products.map(product => (
                <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
  );
};

export default App;
