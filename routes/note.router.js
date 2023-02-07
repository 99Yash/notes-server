"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.post('/', (req, res) => {
    console.log(req.body);
    res.send('POST request to the homepage');
});
exports.default = router;