import React from "react";

export class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  toString() {
    return `Книга: "${this.title}" Автор ${this.author} (${this.year})`;
  }
}

export function BookInfo({ book }) {
  return (
    <div>
      <p>{book.toString()}</p>
    </div>
  );
}
