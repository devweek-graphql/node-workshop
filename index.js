const { ApolloServer } = require('apollo-server');

const { RocketRepository } = require('./datasources/rockets');
const { CommentRepository } = require('./datasources/comments');
const SpacexAPI = require('./datasources/spacex');

const typeDefs = require('./squema/global') ;
const resolvers = require('./resolvers/resolvers') ;
