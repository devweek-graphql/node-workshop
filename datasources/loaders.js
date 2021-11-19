const DataLoader = require("dataloader");

const rocketsLoader = (rocketsRepository) => {
  return new DataLoader(async (ids) => {
    const rockets = await rocketsRepository.getByIds(ids);
    const data = ids.map(id => rockets.find( rocket => rocket.id === id));
    return data;
  });
}

const launchesByRocketLoader = (launchesRepository) => {
  return new DataLoader(async (ids) => {
    const launches = await launchesRepository.getLaunchesByRocketIds(ids);
    const data = ids.map(id => launches.filter( launche => launche.rocket === id));
    return data;
  });
}

module.exports = {
  rocketsLoader,
  launchesByRocketLoader
};