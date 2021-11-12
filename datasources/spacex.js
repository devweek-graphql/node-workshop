const { RESTDataSource } = require('apollo-datasource-rest');

const performanceLogger = async (fn, tag) => {
    const t0 = performance.now();
    const something = await fn();
    const t1 = performance.now();
    console.log();
    console.log(`${tag} took: ${Math.trunc(t1 - t0)}ms`);
    return something;
}
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
        const data = await performanceLogger(() => this.get(`/rockets/${id}`), 'SpacexAPI.getRocketById API call');
        return data;
    }

    async getLaunches(){
        const data = await performanceLogger(() => this.get(`/launches`), 'SpacexAPI.getLaunches API call');
        return data;
    }

    async getRocketsByIds(ids){
        const { docs } = await performanceLogger(() => this.post('/rockets/query', {
            query: {
              id: {
                $in: ids
              }
            },
            options: {
                limit: ids?.length ?? 0
            }
        }), 'SpacexAPI.getRocketsByIds API call');
        return docs;
    }

}

module.exports = SpacexAPI;


