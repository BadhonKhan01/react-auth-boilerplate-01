const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
        ACCESS: process.env.CONFIG,
    },
    default: {
        SECRET: 'SUPERSECRETPASSWORD',
        DATABASE: 'mongodb://localhost:27017/product-test',
        ACCESS: "", //superadmin
        EMAIL: {
            EMAIL_HOST: 'smtp.ethereal.email',
            EMAIL_PORT: 587,
            EMAIL_USER: 'germaine41@ethereal.email',
            EMAIL_PASSWORD: 'Ub5Wq5rDHqEfumkxGh'
        }
    }
}
exports.get = function get(env){
    return config[env] || config.default
}