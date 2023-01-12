"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const docs_1 = __importDefault(require("./docs"));
const app = (0, express_1.default)();
const routes_1 = __importDefault(require("./routes"));
function makeApp() {
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    // Logging
    if (process.env.NODE_ENV === "development") {
        app.use((0, morgan_1.default)("dev"));
    }
    // Static folder
    app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
    //API use with swagger-ui
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_1.default, { explorer: true }));
    app.get("/", (req, res) => {
        res.json({ message: "You are welcome to lendsqr app. Go to /api-docs to see the available routes" });
    });
    app.use("/api", routes_1.default);
    return app;
}
exports.default = makeApp;
