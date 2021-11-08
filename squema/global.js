const {gql} = require('apollo-server');
const commonTypes = require('./common');
const companyTypes = require('./company');
const rocketTypes = require('./rocket');
const launchTypes = require('./launch');

module.exports = gql`

    scalar Date

    ${commonTypes}

    ${companyTypes}

    ${rocketTypes}

    ${launchTypes}

`