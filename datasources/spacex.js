const {RESTDataSource} = require('apollo-datasource-rest');

class SpacexAPI extends RESTDataSource {

    constructor(){
        super();
        this.baseURL = 'https://api.spacexdata.com/v4';
    }

    async getCompanyInfo(){
        const data = await this.get('/company');
        return data;
    }

    async getRockets(){
        const data = await this.get('/rockets');
        return data;
    }

    async getRocketById(id){
        const data = await this.get(`/rockets/${id}`);
        return data;
    }

    async getLaunches(){
        const data = await this.get('/launches');
        return data;
    }

    async getLaunchById(id){
        const data = await this.get(`/launches/${id}`);
        return data;
    }

}

module.exports = SpacexAPI;