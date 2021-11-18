const { RESTDataSource } = require('apollo-datasource-rest');

const performanceLogger = async (fn, tag) => {
    const t0 = performance.now();
    const something = await fn();
    const t1 = performance.now();
    console.log(`API Call - ${tag} took: ${Math.trunc(t1 - t0)}ms -`);
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

    async getLaunches(){
        const data = await performanceLogger(() => this.get(`/launches`), 'SpacexAPI.getLaunches API call');
        return data;
    }

    async getLaunchById(id){
        const data = await this.get(`/launches/${id}`);
        return data;
    }

}

module.exports = SpacexAPI;


