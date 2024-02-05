import { ProgressBar } from './progressbar';

export function ProductCard({
  title,
  description,
  imageUrl,
  price,
  accessibility,
  freestyle,
  powder,
  piste,
  onAddToCart,
}) {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center">
        <img className="rounded-t-lg object-contain h-72 w-72" src={imageUrl} alt={title} />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">{description}</p>

        <ProgressBar label="Accessibilité" value={accessibility} />
        <ProgressBar label="Freestyle" value={freestyle} />
        <ProgressBar label="Poudre" value={powder} />
        <ProgressBar label="Piste" value={piste} />

        <div className="flex justify-between items-center mt-4">
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
