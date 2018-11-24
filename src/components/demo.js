// Basic functionality:
// Comments
// Starter
// Call a method
// Self-method
// Nested method
// Assignment
export default `// This is a sample to document ZenUML
// This sample is not intendet to be realistic, but instead show the features of ZenUML

// Comments at the beginning are not shown in the diagram


// Change order of participant (by appearance) - list them here (ONLY without @Starter!)
LibraryApp
UnknownBookException
LibraryDB
// Define a Starter or leave it without - does not work with participants listed above
//@Starter(User)

// Ask for a book
book = LibraryApp.getBook(Treasure_Island, Stevenson) {
  // create a new instance using "new"
  bm = new BookManager()
  // call on an other object with return value:
  bookID = bm:BookManager.getBook(Treasure_Island, Stevenson) {
    // LOOP: use for, foreach or while
    foreach(author) {
      // self-call (explicit object)
      bm:BookManager.search(Stevenson)
    }
  }
  // ALTERNATIVE: If-Else block
  if(bookID) {
    // self-call (implicit object) - return value is not shown (!)
    bookShelf = getShelf(bookID)
    // async message
    // Syntax is
    // A ->B: some message
    LibraryApp -> LibraryDB: bookID is borrowed
  } else {
    UnknownBookException.throw_exception()
  }
}


// Comments at the end are not shown neither
// TODO: @Starter in combination with participant ordering
// TODO: return value of self-calls. Possibility (css):
//
// #diagram .self>.message>.name::after {
//   background-color: lightcyan;
//   content: " = result";
//   display: block;
// }
`
