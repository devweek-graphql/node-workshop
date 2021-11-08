const { ApolloServer } = require('apollo-server');

const typeDefs = require('./squema/global') ;
const resolvers = require('./resolvers') ;
const SpacexAPI = require('./datasources/spacex');

const dataSources = () => ({
    spacexAPI: new SpacexAPI()
})

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
});

server
    .listen({ port: process.env.port || 4000 })
    .then(({ url }) => {
        console.log(`graphQL iniciado en ${url}`);
    })