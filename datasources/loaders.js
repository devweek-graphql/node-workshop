const DataLoader = require("dataloader");

const rocketsLoader = (api) => {
  const loader = new DataLoader(ids => api.getRocketsByIds(ids));
  return () => loader;
}

module.exports = {
  rocketsLoader,
};