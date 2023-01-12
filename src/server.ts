import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import swaggerUi from "swagger-ui-express";
import docs_options from './docs';


const app: Application = express();
import indexRoute from "./routes";
import { auth } from "./auth/auth";

function makeApp() {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  // Logging
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
  // Static folder
  app.use(express.static(path.join(__dirname, "public")));
  //API use with swagger-ui
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(docs_options, { explorer: true })
  );

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "You are welcome to lendsqr app. Go to /api-docs to see the available routes" });
  });

  app.use("/api", indexRoute);

  return app;
}

export default makeApp;
