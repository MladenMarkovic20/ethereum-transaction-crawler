import AppDataSource from "./src/config/database.connection";
import express, { Express } from "express";
import routes from "./src/routes/routes";

const initialServerSetup = async () => {
  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();

    const app: Express = express();

    app.use(express.json());
    app.use("/", routes);

    app.listen(4000, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:4000`);
    });
  } catch (error) {
    console.log(error);
  }
};

initialServerSetup();
