const { ApolloServer } = require('apollo-server');

const typeDefs = require('./squema/global') ;
const resolvers = require('./resolvers') ;
const SpacexAPI = require('./datasources/spacex');
const { rocketsLoader } = require('./datasources/loaders');

const spacexAPI = new SpacexAPI();

const dataSources = () => ({
    spacexAPI,
    loaders: {
        rockets: rocketsLoader(spacexAPI)
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