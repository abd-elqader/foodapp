export const EMAIL_VALIDATION = {
    required: "field is required",
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "invalid email address",
    },
};

export const PASSWORD_VALIDATION = {
    required: "Field is required",
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        message: "Password must more complex",
    },
};
