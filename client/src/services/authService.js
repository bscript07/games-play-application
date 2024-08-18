import * as request from '../lib/request';

const baseurl = 'http://localhost:3030/users';

export const login = async (email, password) => {
   const result = await request.post(`${baseurl}/login`, {
        email,
        password,
    });

    return result;
}