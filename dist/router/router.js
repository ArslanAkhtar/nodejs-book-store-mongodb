"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_controller_1 = require("../controller/books.controller");
const router = (0, express_1.Router)();
router.get("/getAllBooks", (req, res) => {
    (0, books_controller_1.getBooks)(req, res);
});
router.get("/getBookByISBN", (req, res) => {
    (0, books_controller_1.getBookByISBN)(req, res);
});
router.post("/addBook", (req, res) => {
    (0, books_controller_1.postBook)(req, res);
});
router.delete("/deleteBook", (req, res) => {
    (0, books_controller_1.deleteBook)(req, res);
});
router.use((_req, res) => {
    res.status(404).send("Not Found");
});
exports.default = router;
//# sourceMappingURL=router.js.map