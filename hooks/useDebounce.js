import { useState } from "react";

let timer = null;

const useDebounce = (value, duration = 800) => {
    const [output, setOutput] = useState();
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        setOutput(value)
    }, duration)

    return output;
}

export default useDebounce;