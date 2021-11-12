const DataLoader = require("dataloader");

// Esto no va a escalar muy bien, capaz una especie de factory para los loader seria lo correcto, pero por ahora está bien.
const rocketsLoader = (api) => {
  const loader = new DataLoader(ids => api.getRocketsByIds(ids));
  return () => loader;
}

module.exports = {
  rocketsLoader,
};