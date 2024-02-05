export const ProgressBar = ({ label, value }) => {
    const MAX_VALUE = 5;
    const width = (value / MAX_VALUE) * 100;

    return (
        <div className="mb-1">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{value}/{MAX_VALUE}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${width}%` }}></div>
            </div>
        </div>
    );
};
