export const Navbar = ({ onCartClick, cart }) => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold">YShop</h1>
                <div className="flex items-center">
                    <button className="flex items-center" onClick={onCartClick}>
                        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18l-2 13H5L3 7z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 00-8 0" />
                        </svg>
                        ({cart.length })
                        Panier
                    </button>
                </div>
            </div>
        </nav>
    );
};
