import { AppDataSource } from "./src/config/database.connection";
import express, { Express } from "express";
import routes from "./src/routes/routes";
import cors from "cors";

const initialServerSetup = async () => {
  const connection = AppDataSource;

  const corsOptions = {
    origin: "http://localhost:3000",
  };

  try {
    await connection.initialize();
    await connection.runMigrations();

    const app: Express = express();

    app.use(express.json());
    app.use(cors(corsOptions));
    app.use("/", routes);

    app.listen(4000, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:4000`);
    });
  } catch (error) {
    console.log(error);
  }
};

initialServerSetup();
