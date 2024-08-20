import * as request from '../lib/request';

const baseurl = 'http://localhost:3030/users';

export const login = async (email, password) => {
   const result = await request.post(`${baseurl}/login`, {
        email,
        password,
    });

    return result;
}

export const register = (email, password) => request.post(`${baseurl}/register`, {
        email,
        password,
});

export const logout = () => request.get(`${baseurl}/logout`);