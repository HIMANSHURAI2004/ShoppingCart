export const loadState = () => {
    try {
        const currentState = localStorage.getItem('cartState');
        
        if (currentState === null) {
        return undefined;
        }
        
        return JSON.parse(currentState);
    } catch (err) {
        console.error('Error loading state from localStorage:', err);
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const stateToAdd = JSON.stringify(state);
        localStorage.setItem('cartState', stateToAdd);
    } catch (err) {
        console.error('Error saving state to localStorage:', err);
    }
};

export const clearState = () => {
    try {
        localStorage.removeItem('cartState');
    } catch (err) {
        console.error('Error clearing state from localStorage:', err);
    }
};