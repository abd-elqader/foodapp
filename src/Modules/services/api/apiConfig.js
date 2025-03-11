export const BASE_URL = "https://upskilling-egypt.com:3006/api/v1/";
export const IMAGE_URL = "https://upskilling-egypt.com:3006/";

// USER_URLS
export const users_endpoints = {
    LOGIN: `Users/Login`,
    REGISTER: `Users/Register`,
    VERFIY: `Users/Verify`,
    RESET_REQUEST: `Users/Reset/Request`,
    RESET: `Users/Reset`,
    GET_USER: (id) => `Users/${id}`,
    DELETE_USER: (id) => `Users/${id}`,
    CHANGE_PASSWORD: `Users/ChangePassword`,
};

// CATEGORIES_URLS
export const categories_endpoints = {
    GET_CATEGORIES: `Category`,
    DELETE_CATEGORY: (id) => `Category/${id}`,
    POST_CATEGORY: `Category`,
    DELETE_CATEGORY: (id) => `Category/${id}`,
};

// RECIPES_URLS
export const recipes_endpoints = {
    GET_RECIPES: `Recipe`,
    GET_RECIPE: (id) => `Recipe/${id}`,
    POST_RECIPE: `Recipe`,
    UPDATE_RECIPE: (id) => `Recipe/${id}`,
    DELETE_RECIPE: (id) => `Recipe/${id}`,
};

// FAVORITES_URLS
export const favorites_endpoints = {
    GET_FAVORITES: `userRecipe/`,
    POST_FAVORITES: `userRecipe/`,
    DELETE_FAVORITES: (id) => `userRecipe/${id}`,
};
