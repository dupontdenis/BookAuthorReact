import mongoose from "mongoose";
import { Author } from "./models/author.js";
import { Book } from "./models/books.js";

async function main() {
  await mongoose.connect("mongodb://localhost:27017/library");

  // Flush both collections
  await Author.deleteMany({});
  await Book.deleteMany({});

  // Add author
  const author = new Author({ name: "SuperDupont" });
  await author.save();

  // Add book with author
  const book = new Book({ title: "expressJs", authors: [author._id] });
  await book.save();

  console.log(
    "Database populated: Book 'expressJs' with author 'SuperDupont'."
  );
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
