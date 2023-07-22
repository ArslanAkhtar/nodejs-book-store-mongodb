"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const router_1 = __importDefault(require("./router/router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
const port = 3000;
const server = http_1.default.createServer(app);
mongoose_1.default.Promise = global.Promise;
const mongoDB = process.env.DB_URI || "";
mongoose_1.default.connect(mongoDB);
mongoose_1.default.connection.on("error", () => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});
mongoose_1.default.connection.on("connected", () => {
    console.log("MongoDB connected");
});
app.use("/", router_1.default);
server.listen(port, () => {
    console.log("The application is listening on port 3000!");
});
//# sourceMappingURL=app.js.map