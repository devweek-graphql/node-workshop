const dateScalar = require('../scalars/date');

const _ = require('lodash');

const resolvers = {

    Date: dateScalar,
    Query: {

        company: (parent, args, { dataSources }, info) => {
            return dataSources.spacexAPI.getCompanyInfo();
        },

        rockets: (parent, args, { dataSources }, info) => {
            return dataSources.spacexAPI.getRockets();
        },

        rocket: (parent, {id}, { dataSources }, info) => {
            return dataSources.spacexAPI.getRocketById(id);
        },
        
        launches: (parent, args, { dataSources }, info) => {
            return dataSources.spacexAPI.getLaunches();
        },

    },
    Launch: {
        rocket: (launch, args, { dataSources }, info) => {
            return dataSources.spacexAPI.getRocketById(launch.rocket);
        }
    },
    Rocket: {
        launches: async (rocket, args, { dataSources }, info) => {
            const launches =  await dataSources.spacexAPI.getLaunches();
            return _.filter(launches, {rocket: rocket.id});
        }
    }

}

module.exports = resolvers;