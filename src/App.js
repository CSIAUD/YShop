import React, { useState, useEffect } from 'react';
import { ProductCard } from './components/productcard';
import { Navbar } from './components/navbar';
import axios from 'axios';
import SlideOver from "./components/sliderover";

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [productToAdd, setProductToAdd] = useState(null);

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
        setProductToAdd(product);
        setConfirmDialog(true);
    };

    const confirmAddToCart = () => {
        setCart([...cart, productToAdd]);
        setProductToAdd(null);
        setConfirmDialog(false);
    };

    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

    const toggleSlideOver = () => {
        setIsSlideOverOpen(!isSlideOverOpen);
    }

    return (
        <div>
            <Navbar cart={cart} onCartClick={toggleSlideOver} />
            {isSlideOverOpen && <SlideOver cart={cart} setCart={setCart} />}
            {confirmDialog && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 shadow-lg rounded-lg">
                    <p className="text-gray-700 text-lg font-medium">Êtes-vous sûr de vouloir ajouter ce produit au panier ?</p>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button onClick={confirmAddToCart} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                            Oui
                        </button>
                        <button onClick={() => setConfirmDialog(false)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
                            Non
                        </button>
                    </div>
                </div>
            )}

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-3 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} onAddToCart={() => addToCart(product)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
