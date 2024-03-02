import { createStore } from 'redux';
import CryptoJS from 'crypto-js';


    const productsStore = {
        idList: [],
        productsList: []
    }




function reducer(state = { ...productsStore }, action) {
    switch(action.type) {
        case "SET_ID": return {...state, idList: action.ids };
        case "SET_LIST": return {...state, productsList: action.products };
        
        default: return state;
    }
}

const store = createStore(reducer);

export default store;