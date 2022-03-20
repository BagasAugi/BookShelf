//4
const books = [];
const RENDER_EVENT = "render-book";

//1
document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("inputBook");
 
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });
});

//2
function addBook() {
    const textBook = document.getElementById("inputBookTitle").value;
    const textAuthor = document.getElementById("inputBookAuthor").value;
    const timestamp = document.getElementById("inputBookYear").value;
  
    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, textBook, textAuthor, timestamp, false);
    books.push(bookObject);
   
    document.dispatchEvent(new Event(RENDER_EVENT));
 }

//3
 function generateId() {
    return +new Date();
}
 
 
function generateBookObject(id, title, author, timestamp, isCompleted) {
    return {
        id,
        title,
        author,
        timestamp,
        isCompleted
    }
}

//5
document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
 });


//6
//Menampilkan buku ke kotak belum dibaca dan menandai buku sudah dibaca
function makeBook(bookObject) {
    
    const {id, title, author, timestamp, isCompleted} = bookObject;

    const textTitle = document.createElement("h2");
    textTitle.innerText = bookObject.title;

    const textAuthor = document.createElement("p");
    textAuthor.innerText = bookObject.author;
  
    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = bookObject.timestamp;
  
    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textAuthor, textTimestamp);
  
    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);
    container.setAttribute("id", `book-${bookObject.id}`);
    
    //8
    if(bookObject.isCompleted){
 
        const undoButton = document.createElement("button");
        undoButton.classList.add("blue");
        undoButton.innerText = "Belum Selesai dibaca";
        undoButton.addEventListener("click", function () {
            undoTitleFromCompleted(bookObject.id);
        });
   
        const trashButton = document.createElement("button");
        trashButton.classList.add("red");
        trashButton.innerText = "Hapus";
        trashButton.addEventListener("click", function () {
            removeTitleFromCompleted(bookObject.id);
        });
   
        container.append(undoButton, trashButton);
    } else {
        const checkButton = document.createElement("button");
        checkButton.classList.add("green");
        checkButton.innerText = "Selesai di Baca";
        checkButton.addEventListener("click", function () {
            addTitleToCompleted(bookObject.id);
        })

        container.append(checkButton);
    }


    return container;
 }
//9
function addTitleToCompleted(bookId) {
 
    const bookTarget = findBook(bookId);
    if(bookTarget == null) return;
  
    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
 }

//10
function findBook(bookId){
  for(bookItem of books){
      if(bookItem.id === bookId){
          return bookItem
      }
  }
  return null
}

//7
document.addEventListener(RENDER_EVENT, function () {
    const incompletedBOOKList = document.getElementById("incompleteBookshelfList");
    incompletedBOOKList.innerHTML = "";
  
    for(bookItem of books){
      const bookElement = makeBook(bookItem);
      incompletedBOOKList.append(bookElement);
      
      //11
      if(bookItem.isCompleted == false)
          incompletedBOOKList.append(bookElement);
    }
 });


