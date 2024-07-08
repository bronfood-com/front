import { API_URL } from '../consts';

interface FetchOptions extends RequestInit {
    data: object;
}

/**
 * Wrapper for fetch requests
 *
 * @param {} endpoint API URL's endpoint
 * @param {} options request's custom options
 */
export const handleFetch = async (endpoint: string, { method, data, headers: customHeaders, ...customOptions }: FetchOptions | Record<string, never> = {}) => {
    const token = localStorage.getItem('token');
    const options: RequestInit = {
        method: data ? method : 'GET',
        headers: {
            Authorization: token ? `Token ${token}` : '',
            'Content-Type': data ? 'application/json;charset=utf-8' : '',
            ...customHeaders,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...customOptions,
    };
    const res = await fetch(`${API_URL}/${endpoint}/`, options);
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
