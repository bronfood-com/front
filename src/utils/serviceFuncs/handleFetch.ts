/**
 * Wrapper for fetch requests
 *
 * @param {} endpoint API URL's endpoint
 * @param {} options request's custom options
 */

//const baseUrl = 'http://127.0.0.1:8000';
//const baseUrl = 'https://bronfood.sytes.net';
const baseUrl = 'https://bron-dev.bounceme.net'; // test server

interface FetchOptions extends RequestInit {
    method: RequestInit.method;
    data: object;
    headers: RequestInit.headers;
}

export const handleFetch = async (endpoint, { method, data, headers: customHeaders, ...customOptions }: FetchOptions = {}) => {
    const token = localStorage.getItem('token');
    const options = {
        method: data ? method : 'GET',
        headers: {
            Authorization: token ? `Token ${token}` : undefined,
            'Content-Type': data ? 'application/json;charset=utf-8' : undefined,
            ...customHeaders,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...customOptions,
    };
    const res = await fetch(`${baseUrl}/${endpoint}/`, options);
    if (res.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Authorization error');
    }
    const result = await res.json();
    if (res.ok) {
        return result;
    } else {
        return Promise.reject(result);
    }
};
