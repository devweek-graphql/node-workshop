const { ApolloServer } = require('apollo-server');

const { DAO, RocketRepository } = require('./datasources/rockets');
const typeDefs = require('./squema/global') ;
const resolvers = require('./resolvers/resolvers') ;
const SpacexAPI = require('./datasources/spacex');
const { rocketsLoader } = require('./datasources/loaders');

const spacexAPI = new SpacexAPI();

const dao = new DAO();
const rocketsRepository =  new RocketRepository(dao);

const dataSources = () => ({
    spacexAPI,
    rocketsRepository,
    loaders: {
        rockets: rocketsLoader(rocketsRepository)
    },
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