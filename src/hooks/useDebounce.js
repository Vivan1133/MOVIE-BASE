function useDebounce(callback, delay = 1000) {
    // it takes a callback and returns a modified callback, that executes after a delay 
    let timerID;
    return (...args) => {
        clearTimeout(timerID);  // if there is old timer going on, remove it!
        timerID = setTimeout(() => {
            callback(...args);
        }, delay);
    }
}

export default useDebounce;