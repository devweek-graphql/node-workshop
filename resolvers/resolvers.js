const dateScalar = require('../scalars/date');

const resolvers = {
    Date: dateScalar,
    Query: {
        company: (parent, args, { dataSources }, info) => {
            return dataSources.spacexAPI.getCompanyInfo();
        },
        rockets: (parent, args, { dataSources }, info) => {
            return dataSources.rocketsRepository.getAll();
        },
        rocket: (parent, {id}, { dataSources }, info) => {
            return dataSources.rocketsRepository.getById(id);
        },
        launches: (parent, args, { dataSources }, info) => {
            console.log('Resolver - Query.launches -');
            return dataSources.spacexAPI.getLaunches();
        },
        launch: (parent, {id}, { dataSources }, info) => {
            return dataSources.spacexAPI.getLaunchById(id);
        },
    },
    Launch: {
        rocket: (launch, args, { dataSources }, info) => {
            console.log('Resolver - Launch.rocket -');
            return dataSources.rocketsRepository.getById(launch.rocket);
        }
    },
    Rocket: {
        launches: async (rocket, args, { dataSources }, info) => {
            console.log('Resolver - Rocket.launches -');
            return dataSources.spacexAPI.getLaunchesByRocketId(rocket.id);
        }
    }
}

module.exports = resolvers;