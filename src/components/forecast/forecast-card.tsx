
const ForecastCard = ({ maxTemp, minTemp, date, icon }: { maxTemp: number; minTemp: number; date: string; icon: string }) => {

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center ">
                <h3 className="text-lg font-bold mb-2">{date}</h3>
                <img src={icon} className="w-8" />
            </div>
            <div className="flex justify-between items-center mt-2">
                <span className="text-blue-500">Max: {maxTemp}°C</span>
                <span className="text-red-500">Min: {minTemp}°C</span>
            </div>
        </div>
    );
};

export default ForecastCard;
