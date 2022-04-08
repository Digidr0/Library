const libraryContainer = document.querySelector(".library");
const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const pagesInput = document.querySelector(".pages");
const isReadInput = document.querySelector(".isRead");
const bookCover = document.querySelector(".url");
const delBtn = document.querySelector(".del-btn");
const sumbitBtn = document.querySelector(".sumbit.btn");

let myLilbrary = [];
let idNum = 0;

function randomColor() {
  // Math.random() * (max - min) + min;
  let h = Math.floor(Math.random() * 30 + 30);
  let s = Math.floor(Math.random() * 60 + 40);
  let l = Math.floor(Math.random() * 30 + 40);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

Object.prototype.read = function () {
  this.textContent = "Read";
  this.style.setProperty("background-color", "#20aa20");
};
Object.prototype.notRead = function () {
  this.textContent = "Not read";
  this.style.setProperty("background-color", "#DC2626");
};

function Book(title, author, pages, isRead, url) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.idNum = idNum;
  this.url = url;
}
Book.prototype.haveRead = function () {
  this.read = true;
};
Book.prototype.haveNotRead = function () {
  this.read;
};

function addBookToLibrary() {
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pagesInput.value;
  let isRead = isReadInput.checked;
  let url = bookCover.value;
  let book = new Book(title, author, pages, isRead, url);
  myLilbrary.push(book);
  isReadInput.value == true ? book.haveRead() : book.haveNotRead();
  createBook(book);
}

function createBook(book) {
  idNum++;

  const card = document.createElement("div");
  const bg = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const delBtn = document.createElement("button");
  const readBtn = document.createElement("button");

  const textContainer = document.createElement("div");
  const buttonContainer = document.createElement("div");

  card.classList.add("card");
  title.classList.add("title");
  author.classList.add("author");
  pages.classList.add("pages");
  delBtn.classList.add("del-btn");
  readBtn.classList.add("read-btn");
  textContainer.classList.add("text-container");
  buttonContainer.classList.add("button-container");

  if (book.url == undefined) {
    card.style.setProperty("background-image", `none`);
    card.style.setProperty("background-color", `${randomColor()}`);
  } else {
    card.style.setProperty("background-image", `url(${book.url})`);
  }

  title.textContent = `"${book.title}"`;
  author.textContent = `by: ${book.author}`;
  pages.textContent = `${book.pages} pages`;
  delBtn.value = idNum;
  delBtn.textContent = `X`;

  if (book.isRead == true) {
    readBtn.read();
  } else {
    readBtn.notRead();
  }

  delBtn.addEventListener("click", function () {
    myLilbrary.splice(book.idNum, 1);
    card.remove();
  });
  readBtn.addEventListener("click", (e) => {
    e.target.textContent === "Read" ? e.target.notRead() : e.target.read();
  });

  libraryContainer.appendChild(card);
  card.appendChild(textContainer);
  card.appendChild(buttonContainer);
  textContainer.appendChild(title);
  textContainer.appendChild(author);
  textContainer.appendChild(pages);
  buttonContainer.appendChild(delBtn);
  buttonContainer.appendChild(readBtn);
}
function toggleDisplay() {
  document.querySelector(".form").classList.toggle("none");
}

sumbitBtn.addEventListener("click", (e) => {
  if (titleInput.value == "") {
    titleInput.style.setProperty("border-color", "red");
  } else if (authorInput.value == "") {
    authorInput.style.setProperty("border-color", "red");
  } else if (pagesInput.value == "") {
    pagesInput.style.setProperty("border-color", "red");
  } else {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    addBookToLibrary();
    toggleDisplay();
  }
});

const Hobbit = new Book(
  "Hobbit J.G.RR",
  "Tolkien",
  "5603",
  true,
  "https://source.unsplash.com/random/200x300/?hobbit"
);
createBook(Hobbit);

const HarryPotter = new Book(
  "Harry Potter and flame",
  "J. roaling",
  "2633",
  true,
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/6a8033105402815.5f783bbed1129.png"
);
createBook(HarryPotter);

const GameOfThrones = new Book(
  "Game of Thrones",
  "Mark Hendor",
  "3543",
  false,
  "https://img.freepik.com/free-vector/chinese-dragon-illustration_113398-177.jpg"
);
createBook(GameOfThrones);
