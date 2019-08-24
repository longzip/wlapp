const config = {
    user: 'sa',
    password: '111111',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'laravel',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}; 
module.exports = config;
