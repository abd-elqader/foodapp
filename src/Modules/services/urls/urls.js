import axios from 'axios';

export  const baseURL = 'https://upskilling-egypt.com:3006/api/v1/';

//public
export const axios_instance = axios.create({
    baseURL
});

//private
export const axios_instance_auth = axios.create({
    baseURL,
    headers: {Authorization: localStorage.getItem('token')}
});

export const USER_URLS = {
    LOGIN: `Users/login`,
    REGISTER: `Users/register`,
    FORGOT_PASS: `Users/Reset/Request`,
    RESET_PASS: `Users/Reset`,
    GET_USER: (id)=> `/Users/${id}`,
}

export const RECIPES_URLS = {
    GET_RECIPES: `Recipe`,
    CREATE_RECIPE: `Recipe`,
    GET_RECIPE: (id)=> `/Recipe/${id}`,
    UPDATE_RECIPE: (id)=> `/Recipe/${id}`,
    DELETE_RECIPE: (id)=> `/Recipe/${id}`,
}

export const CATEGORIES_URLS = {
    GET_CATEGORIES: `Category`,
    CREATE_CATEGORY: `Category`,
    GET_CATEGORY: (id)=> `/Category/${id}`,
    UPDATE_CATEGORY: (id)=> `/Category/${id}`,
    DELETE_CATEGORY: (id)=> `/Category/${id}`,
}

export const USERS_URLS = {
    GET_USERS: `Users`,
    CREATE_USER: `User`,
    GET_USER: (id)=> `/User/${id}`,
    UPDATE_USER: (id)=> `/User/${id}`,
    DELETE_USER: (id)=> `/User/${id}`,
}