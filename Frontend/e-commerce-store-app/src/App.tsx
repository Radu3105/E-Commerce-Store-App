import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [data, setData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://localhost:44361/WeatherForecast"
                );
                setData(response.data);
            } catch (error) {
                console.error("Error!");
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {data ? (
                <h1>Server responded with: "{data}"</h1>
            ) : (
                <h1>No connection between client and server</h1>
            )}
        </>
    );
}

export default App;
