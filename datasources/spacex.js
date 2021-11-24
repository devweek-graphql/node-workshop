const { RESTDataSource } = require('apollo-datasource-rest');

class SpacexAPI extends RESTDataSource {

    constructor(){
        super();
        this.baseURL = 'https://api.spacexdata.com/v4';
    }

    getCompanyInfo(){
        return this.get('/company');
    }

    getLaunches(){
        return this.get(`/launches`);
    }

    getLaunchById(id){
        return this.get(`/launches/${id}`);;
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


