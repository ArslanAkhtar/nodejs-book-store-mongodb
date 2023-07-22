import { Router, Request, Response } from "express";
import {
  deleteBook,
  getBookByISBN,
  getBooks,
  postBook,
} from "../controller/books.controller";

const router = Router();

router.get("/getAllBooks", (req: Request, res: Response) => {
  getBooks(req, res);
});

router.get("/getBookByISBN", (req: Request, res: Response) => {
  getBookByISBN(req, res);
});

router.post("/addBook", (req: Request, res: Response) => {
  postBook(req, res);
});

router.delete("/deleteBook", (req: Request, res: Response) => {
  deleteBook(req, res);
});

router.use((_req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

export default router;
