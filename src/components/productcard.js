export function ProductCard({
  id, title, description, imageUrl, price, onAddToCart,
}) {
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img className="w-full rounded-t-lg" src={imageUrl} alt={title} />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>

        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{price}</span>
          <button
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onAddToCart}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
