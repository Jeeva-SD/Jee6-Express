"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseCredentials = exports.PORT = void 0;
exports.PORT = process.env.PORT || 6040;
exports.databaseCredentials = {
    host: '191.101.229.58',
    user: 'demoUser',
    password: 'demoUser',
    port: 3306,
    database: 'demo',
    connectionLimit: 10,
};
