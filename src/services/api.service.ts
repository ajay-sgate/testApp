import axios from 'axios';
const config1 = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const config2 = {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
};

export function Post(url: any, payload?: any) {
    return new Promise((resolve, reject) => {
        axios.post(url, payload,config1)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e)
            });
    });
}

export function PostFormData(url: any, payload?: any) {
    return new Promise((resolve, reject) => {
        axios.post(url, payload,config2)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e)
            });
    });
}

export function Put(url: any, payload: any) {
    return new Promise((resolve, reject) => {
        axios.put(url, payload,)
            .then((response) => {
                resolve(response.data);
            })
            .catch((e) => {
                reject(e)
            });
    });
}

export function Get(url: any) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((response) => {
                resolve(response.data);
            })
            .catch((e) => {
                reject(e)
            });
    });
}

export function Delete(url: any) {
    return new Promise((resolve, reject) => {
        axios.delete(url)
            .then((response) => {
                resolve(response.data);
            })
            .catch((e) => {
                reject(e)
            });
    });
}
