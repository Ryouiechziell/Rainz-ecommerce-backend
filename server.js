const app = require("./src/main");
const db = require(".src/models/models");
const PORT = process.env.PORT || 7000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
