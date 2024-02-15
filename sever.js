const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startSever() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log("connected db");

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`sever is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`cannot connected db`, error);
    process.exit();
  }
}

startSever();
