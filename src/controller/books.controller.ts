import { Request, Response } from "express";
import Book from "../model/books.model";
import { IBook } from "../utils/types";
import { sendResponse } from "../utils/helper";

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.db.collection("books").find({}).toArray();

  sendResponse.data = books as IBook[];
  sendResponse.status = "success";
  sendResponse.statusCode = 200;

  res.send(sendResponse);
};

export const getBookByISBN = async (req: Request, res: Response) => {
  const { isbn } = req.body;
  if (!isbn) {
    sendResponse.message = "ISBN is required";
    sendResponse.status = "failure";
    sendResponse.statusCode = 400;
    res.status(400).json(sendResponse);
  }

  try {
    const book = await Book.db.collection("books").findOne({ isbn });
    if (!book) {
      res.status(500).json({ error: "Book not found." });
    } else {
      sendResponse.data = book as IBook;
      sendResponse.status = "success";
      sendResponse.statusCode = 200;
      res.send(sendResponse);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const postBook = async (req: Request, res: Response) => {
  const { title, author, isbn } = req.body;

  const existingBook = await Book.findOne({ title, author });

  if (existingBook) {
    return res.status(409).json({ error: "Book already exists" });
  }

  try {
    const newBook: IBook = new Book({
      title,
      author,
      isbn,
    });
    const savedBook = await newBook.save();

    res.status(200).json(savedBook);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { isbn } = req.body;

  try {
    const deletedBook = await Book.db.collection("books").findOneAndDelete({
      isbn,
    });

    if (!deletedBook.value) {
      res.status(500).json({ error: "Book not found." });
    } else {
      sendResponse.message = "Book deleted successfully";
      sendResponse.status = "success";
      sendResponse.statusCode = 201;
      res.send(sendResponse);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
