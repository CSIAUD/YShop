import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import axios from "axios";

export default function SlideOver({cart = [], setCart}) {
    const [open, setOpen] = useState(true)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [selectedProductID, setSelectedProductID] = useState(null);
    const [showNotification, setShowNotification] = useState(false);


    function removeFromCart(id) {
        const newCart = cart.filter((product) => product.id !== id);
        setCart(newCart);
    }

    function postOrder() {
        const order = {
            id: cart.map((product) => product.id),
            userId: 1,
            total: totalPrice
        };
        axios
            .post('http://localhost:8080/api/orders', order)
            .then((response) => {
                if (response.status === 201) {
                    console.log("offre postée")
                    setCart([]);
                } else {
                    console.error('La requête a échoué avec le code de statut:', response.status);
                }
            })
            .then((response) => {
                if (response.status === 201) {
                    setCart([]);
                    setShowNotification(true);
                    setTimeout(() => setShowNotification(false), 3000); // La notification disparaît après 3 secondes
                } else {
                    console.error('La requête a échoué avec le code de statut:', response.status);
                }
            })
            .catch((error) => {
                console.error('Une erreur s\'est produite lors de la requête:', error);
            });
    }

    let totalPrice = 0;
    if (cart.length > 0) {
        totalPrice = cart.reduce((total, product) => {
            return total + parseFloat(product.price.replace(" €", ""));
        }, 0);
    }

    function requestRemoveFromCart(id) {
        setSelectedProductID(id);
        setShowConfirmDelete(true);
    }

    function confirmRemoveFromCart() {
        if (selectedProductID !== null) {
            const newCart = cart.filter((product) => product.id !== selectedProductID);
            setCart(newCart);
            setShowConfirmDelete(false);
        }
    }


    return (
        <Transition.Root show={open} as={Fragment}>
            <div>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title
                                                    className="text-lg font-medium text-gray-900">Panier</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-0.5"/>
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">

                                                        {cart.map((cart) => (
                                                            <li key={cart.id} className="flex py-6">
                                                                <div
                                                                    className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={cart.imageUrl}
                                                                        alt={cart.imageAlt}
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div
                                                                            className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <a href={cart.href}>{cart.name}</a>
                                                                            </h3>
                                                                            <p className="ml-4">{cart.price}</p>
                                                                        </div>
                                                                        <p className="mt-1 text-sm text-gray-500">{cart.color}</p>
                                                                    </div>
                                                                    <div
                                                                        className="flex flex-1 items-end justify-between text-sm">
                                                                        <p className="text-gray-500"></p>

                                                                        <div className="flex">
                                                                            <button
                                                                                type="button"
                                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                onClick={() => requestRemoveFromCart(cart.id)}
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Prix</p>
                                                <p>{totalPrice.toFixed(2)} €</p>
                                            </div>
                                            <div className="mt-6">
                                                <button disabled={cart.length < 1}
                                                        className={`flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm ${
                                                            cart.length < 1 ? 'bg-gray-500 hover:bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'
                                                        }`} onClick={() => postOrder(cart.id)}>
                                                    Acheter
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </div>
                        </div>
                    </div>
                </Dialog>
                {showConfirmDelete && (
                    <Dialog as="div" className="relative z-20" onClose={() => setShowConfirmDelete(false)}>
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75"/>
                        <div className="fixed inset-0 flex items-center justify-center p-4">
                            <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6">
                                <Dialog.Description>
                                    Voulez-vous vraiment supprimer cet article ?
                                </Dialog.Description>
                                <div className="mt-4">
                                    <button className="mr-2 bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={confirmRemoveFromCart}>Supprimer
                                    </button>
                                    <button className="bg-gray-300 px-4 py-2 rounded"
                                            onClick={() => setShowConfirmDelete(false)}>Annuler
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                )}
            </div>
        </Transition.Root>
    )
}
