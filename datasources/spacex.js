const { RESTDataSource } = require('apollo-datasource-rest');

class SpacexAPI extends RESTDataSource {

    constructor(){
        super();
        this.baseURL = 'https://api.spacexdata.com/v4';
    }

    async getCompanyInfo(){
        const data = await this.get('/company');
        return data;
    }

    async getLaunches(){
        const data = await this.get(`/launches`);
        return data;
    }

    async getLaunchById(id){
        const data = await this.get(`/launches/${id}`);
        return data;
    }

    async getLaunchesByRocketId(id){
        const { docs } = await this.post(`/launches/query`, {
            query: {
                rocket: id
            }
        });
        return docs;
    }

    async getLaunchesByRocketIds(ids){
        const { docs } = await this.post(`/launches/query`, {
            query: {
                rocket: {
                  $in: ids
                }
              }
        });
        return docs;
    }

}

module.exports = SpacexAPI;


