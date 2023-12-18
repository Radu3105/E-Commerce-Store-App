import { useEffect } from "react";

export default function useLocalStorage(key: string, defaultValue: any) {
    const [value, setValue] = useState(() => {
        let currentValue;
        try {
            currentValue = JSON.parse(localStorage.getItem(key) || String(defaultValue));
        }
        catch (error) {
            currentValue = defaultValue;
        }
        return currentValue;
    });
    useEffect(() => {

    }, [value, key]);
}