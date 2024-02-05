import React, { useState } from 'react';
import { ProductCard } from './components/productcard';
import { Navbar } from './components/navbar';
import SlideOver from './components/sliderover';

const initialProducts = [
    {
        "id": 1,
        "title": "Volkl Revolt 90",
        "description": "Le Volkl Revolt 90 est un ski bispatulé idéal pour les tricks sur les bords de pistes et dans le snowpark. Avec son noyau bois léger, il offre un flex équilibré, du pop, et de la souplesse. Son cambre classique assure une bonne accroche et le double rocker facilite les mises en pivot et apporte une bonne glisse dans la poudreuse légère.",
        "imageUrl": "https://glisshop-glisshop-fr-storage.omn.proximis.com/Imagestorage/imagesSynchro/735/735/29d373a7a6376476452b9d91a10a70035c2cd456_H23VOLKSKI217833_0.jpeg",
        "price": "400 €",
        "accebility": "3",
        "freestyle": "5",
        "poudre": "2",
        "piste": "3"
    },
    {
        "id": 2,
        "title": "Salomon QST 92",
        "description": "Le Salomon QST 92 est un ski polyvalent conçu pour explorer la montagne. Son noyau en bois et le profil All-Terrain Rocker offrent une stabilité remarquable et une maniabilité fluide sur divers types de neige. Parfait pour les skieurs intermédiaires à avancés.",
        "imageUrl": "https://skipass.fr/p/guidematos/2/3/239399/286627-salomon-qst-92.jpg",
        "price": "450 €",
        "accebility": "4",
        "freestyle": "3",
        "poudre": "4",
        "piste": "4"
    },
    {
        "id": 3,
        "title": "Atomic Bent Chetler 100",
        "description": "L'Atomic Bent Chetler 100 est excellent pour ceux qui cherchent à se divertir sur toute la montagne. Avec son profil HRZN Tech, il offre une portance exceptionnelle en poudreuse et une agilité remarquable sur piste. Un choix de prédilection pour le freeride et les aventures all-mountain.",
        "imageUrl": "https://images.snowleader.com/cdn-cgi/image/f=auto,fit=scale-down,q=85/https://images.snowleader.com/media/catalog/product/cache/1/image/0dc2d03fe217f8c83829496872af24a0/A/T/ATOM01347_01.jpg",
        "price": "500 €",
        "accebility": "4",
        "freestyle": "4",
        "poudre": "5",
        "piste": "3"
    },{
        "id": 4,
        "title": "Rossignol Experience 88 TI",
        "description": "Le Rossignol Experience 88 TI est un ski all-mountain qui excelle sur la piste grâce à sa construction titane pour plus de stabilité et de précision. Parfait pour les skieurs confirmés cherchant à carver sur toute la montagne.",
        "imageUrl": "https://skipass.fr/p/guidematos/1/7/171528/242780.jpg",
        "price": "550 €",
        "accebility": "4",
        "freestyle": "2",
        "poudre": "4",
        "piste": "5"
    },
    {
        "id": 5,
        "title": "Nordica Enforcer 100",
        "description": "Le Nordica Enforcer 100 est connu pour sa polyvalence et sa performance sur toutes les conditions de neige. Idéal pour les skieurs avancés à experts cherchant à maîtriser les pistes et la poudreuse.",
        "imageUrl": "https://www.nordica.com/storage/thumbs/Product/_1064_resize_rotate_0A358400001_ENFORCER_100_FLAT_01.webp",
        "price": "600 €",
        "accebility": "4",
        "freestyle": "3",
        "poudre": "5",
        "piste": "4"
    }
]

function App() {
    const [products, setProducts] = useState(initialProducts);
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

    const toggleSlideOver = () => {
        setIsSlideOverOpen(!isSlideOverOpen);
    };

    return (
        <div>
            <Navbar cart={cart} onCartClick={toggleSlideOver}/>
            {isSlideOverOpen && <SlideOver cart={cart} setCart={setCart}/>}

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

        </div>
    );
}

export default App;
