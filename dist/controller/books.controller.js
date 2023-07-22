"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.postBook = exports.getBookByISBN = exports.getBooks = void 0;
const books_model_1 = __importDefault(require("../model/books.model"));
const helper_1 = require("../utils/helper");
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield books_model_1.default.db.collection("books").find({}).toArray();
    helper_1.sendResponse.data = books;
    helper_1.sendResponse.status = "success";
    helper_1.sendResponse.statusCode = 200;
    res.send(helper_1.sendResponse);
});
exports.getBooks = getBooks;
const getBookByISBN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isbn } = req.body;
    if (!isbn) {
        helper_1.sendResponse.message = "ISBN is required";
        helper_1.sendResponse.status = "failure";
        helper_1.sendResponse.statusCode = 400;
        res.status(400).json(helper_1.sendResponse);
    }
    try {
        const book = yield books_model_1.default.db.collection("books").findOne({ isbn });
        if (!book) {
            res.status(500).json({ error: "Book not found." });
        }
        else {
            helper_1.sendResponse.data = book;
            helper_1.sendResponse.status = "success";
            helper_1.sendResponse.statusCode = 200;
            res.send(helper_1.sendResponse);
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getBookByISBN = getBookByISBN;
const postBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, isbn } = req.body;
    const existingBook = yield books_model_1.default.findOne({ title, author });
    if (existingBook) {
        return res.status(409).json({ error: "Book already exists" });
    }
    try {
        const newBook = new books_model_1.default({
            title,
            author,
            isbn,
        });
        const savedBook = yield newBook.save();
        res.status(200).json(savedBook);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.postBook = postBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isbn } = req.body;
    try {
        const deletedBook = yield books_model_1.default.db.collection("books").findOneAndDelete({
            isbn,
        });
        if (!deletedBook.value) {
            res.status(500).json({ error: "Book not found." });
        }
        else {
            helper_1.sendResponse.message = "Book deleted successfully";
            helper_1.sendResponse.status = "success";
            helper_1.sendResponse.statusCode = 201;
            res.send(helper_1.sendResponse);
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deleteBook = deleteBook;
//# sourceMappingURL=books.controller.js.map