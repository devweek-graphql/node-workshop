const { ApolloServer } = require('apollo-server');

const { DataBase } = require('./datasources/database');
const { RocketRepository } = require('./datasources/rockets');
const typeDefs = require('./squema/global') ;
const resolvers = require('./resolvers/resolvers') ;
const SpacexAPI = require('./datasources/spacex');

const spacexAPI = new SpacexAPI();

const rocketsDB = new DataBase('./rockets.db');
const rocketsRepository =  new RocketRepository(rocketsDB);

const dataSources = () => ({
    spacexAPI,
    rocketsRepository
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
});

server
    .listen({ port: process.env.port || 4000 })
    .then(({ url }) => {
        console.log(`graphQL iniciado en ${url}`);
    });