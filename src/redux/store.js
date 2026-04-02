import { createStore, combineReducers } from 'redux';
import cartReducer from './reducers/cartReducer';
import productsReducer from './reducers/productsReducer';
import { loadState, saveState } from './localStorage';


const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
});

const persistedCartState = loadState();
const preloadedState = persistedCartState
    ? { cart: persistedCartState }
    : undefined;
    
const store = createStore(
    rootReducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    const state = store.getState();
    saveState(state.cart);
});

export default store;