export const ProductCard = ({ title, description, imageUrl }) => {
    return (
        <div className="border rounded-md p-4 shadow-lg">
            <img src={imageUrl} alt={title} className="w-full h-64 object-cover rounded-t-md" />
            <div className="p-4">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};
