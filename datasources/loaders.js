const DataLoader = require("dataloader");

// Esto no va a escalar muy bien, capaz una especie de factory para los loader seria lo correcto, pero por ahora está bien.
const rocketsLoader = (rocketsRepository) => {
  const loader = new DataLoader(ids => rocketsRepository.getByIds(ids));
  return () => loader;
}

module.exports = {
  rocketsLoader,
};