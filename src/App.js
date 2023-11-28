import React, { useState, useEffect } from 'react';
import { ProductCard } from './components/productcard';
import { Navbar } from './components/navbar';
import axios from 'axios';
import SlideOver from "./components/sliderover";

const App = () => {
    const [products, setProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);

    function getProducts() {
        axios
            .get('http://localhost:8080/api/products')
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data);
                    setProducts(data);
                } else {
                    console.error('La requête a échoué avec le code de statut:', response.status);
                }
            })
            .catch((error) => {
                console.error('Une erreur s\'est produite lors de la requête:', error);
            });
    }

    const addToCart = () => {
        if (selectedProduct) {
            setCart([...cart, selectedProduct]);
            setShowPopup(false);
        }
    };

    const openPopup = (product) => {
        setSelectedProduct(product);
        setShowPopup(true);
    };

    const closePopup = () => {
        setSelectedProduct(null);
        setShowPopup(false);
    };
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

    const toggleSlideOver = () => {
        setIsSlideOverOpen(!isSlideOverOpen);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <Navbar cart={cart} onCartClick={toggleSlideOver} />
            {isSlideOverOpen && <SlideOver/>}
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-3 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} onClick={() => openPopup(product)} />
                    ))}
                </div>
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Êtes-vous sûr de vouloir ajouter ce produit au panier ?</h2>
                        <button onClick={addToCart}>Ajouter au panier</button>
                        <button onClick={closePopup}>Annuler</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;