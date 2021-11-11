const dateScalar = require('./scalars/date');
const _filter = require('lodash/filter');

const { performanceLogger } = require('./helpers');

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
            return performanceLogger(() => dataSources.spacexAPI.getLaunches(), `Query.launches resolver`);
        },

    },
    Launch: {
        rocket: (launch, args, { dataSources }, info) => {
            return performanceLogger(() => dataSources.loaders.rockets().load(launch.rocket), `Launch.rocket resolver`);
        }
    },
    Rocket: {
        launches: async (rocket, args, { dataSources }, info) => {
            const launches =  await dataSources.spacexAPI.getLaunches();
            return _filter(launches, {rocket: rocket.id});
        }
    }

}

module.exports = resolvers;