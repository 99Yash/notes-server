"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const note_router_1 = __importDefault(require("./routes/note.router"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
}));
app.use('/api/notes', note_router_1.default);
app.listen(port, () => {
    console.log('Server is running on port 5000');
});
