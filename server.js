import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDomServer from "react-dom/server";
import App from "./src/App.js";

const app = express();
const PORT = process.env.PORT || 8000;

global.window = {};

const API_BASE_URL = "/api/v1";
let nextBookId = 4;

const books = [
  {
    id: 1,
    name: "Being Mortal",
    price: 22,
    category: "Non-fiction",
    description:
      "What is Being Mortal about? In this thought-provoking book, a renowned medical professional explores the delicate topic of mortality. Through personal anecdotes and insightful research, the author delves into the flaws of modern medicine's approach to aging and dying.",
  },
  {
    id: 2,
    name: "Freakonomics",
    price: 18,
    category: "Economic",
    description:
      "Freakonomics shows how incentives, information asymmetry, and other economic theories impact culture in ways beyond economics, including why people cheat and why names are important. However, at the end of the book, the author points out that statistical data does not always explain how people behave.",
  },
  {
    id: 3,
    name: "Little Prince",
    price: 15,
    category: "Fairy Tales",
    description:
      "The story is a sort of coming-of-age story about the main character, the Little Prince, who comes to earth from a distant planet. Out of loneliness he has left his own tiny planet, where his only friend is a rose.",
  },
];

app.use(express.json());
app.use(express.static(path.resolve("build")));

app.get("/books", (req, res) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log("Failed to retrieve index.html from the build folder.");
      console.log(err);
      res.status(500).send("Server error");
    }

    const htmlWithPreloadedBooks = data.replace(
      '<div id="root"></div>',
      `<script>window.preloadedBooks=${JSON.stringify(
        books
      )}</script><div id="root">${ReactDomServer.renderToString(
        <App initialDataFromServer={books} />
      )}</div>`
    );

    res.send(htmlWithPreloadedBooks);
  });
});

app.post(`${API_BASE_URL}/add`, (req, res) => {
  const bookData = req.body;
  const newBook = { ...bookData, id: nextBookId };
  books.push(newBook);
  nextBookId++;
  res.status(201).json(newBook);
});

app.put(`${API_BASE_URL}/edit`, (req, res) => {
  const bookData = req.body;

  const index = books.findIndex((book) => book.id === bookData.id);

  if (index !== -1) {
    books[index] = { ...books[index], ...bookData };
    res.status(200).json(books[index]);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.delete(`${API_BASE_URL}/delete/:id`, (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

app.listen(8000, () => {
  console.log("Listening on port " + PORT);
});
