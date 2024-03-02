
import CryptoJS from 'crypto-js';


const password = 'Valantis';
const timestamp = new Date().toISOString().slice(0, 10).split('-').join('');
const data = `${password}_${timestamp}`;

const authorizationString = CryptoJS.MD5(data).toString();;

export async function getStore() {
    const res = await fetch("http://api.valantis.store:40000/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth': authorizationString
        },

        body: JSON.stringify(
            {
                action: 'get_ids'
            }
        ),

    }).then(response => response ? response : []).catch((err) => console.log(err))
        return res.json()
    
}

export async function getProduct(ids) {
    const items = await fetch("http://api.valantis.store:40000/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth': authorizationString
        },

        body: JSON.stringify(
            {
                action: "get_items",
                params: {"ids": ids}
            }
        ),

    }).then(response => response ? response : []).catch((err) => console.log(err))
    if (items.status === 500) {
        console.log('Ошибка 500')
        getProduct(ids)
    } 
        return items.json()
}


export async function getFilterProduct(filter) {
    const filterItems = await fetch("http://api.valantis.store:40000/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth': authorizationString
        },
        body: JSON.stringify(
            {
                "action": "filter",
                "params": filter
            }
        ),

    }).then(response => response ? response : []).catch((err) => console.log(err))
    if (filterItems.status === 500) {
        console.log('Ошибка 500')
        getFilterProduct(filter)
        return [1]
    } else {
        return filterItems.json()
        
    }
}
