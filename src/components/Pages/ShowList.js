import React, { useState } from 'react';
import './ShowList.css';

export default function ShowList() {
  const [books, setBooks] = useState([]);

  const [updateBookId,setUpdateId] = useState('');

  const [deleteBookId,setDeleteId] = useState('');

  const [addBook, setAddBook] = useState({
    title: "",
    author: "",
    publisher: "",
    publicationdate: ""
  });

  const [updateBook, setUpdateBook] = useState({
    title: "",
    author: "",
    publisher: "",
    publicationdate: ""
  });

  const handelAddInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name, value)
    setAddBook({ ...addBook, [name]: value });
  }

  const handelUpdateInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name, value)
    setUpdateBook({ ...updateBook, [name]: value });
  }

  const handelUpdateIdInput = (event)=>{
    setUpdateId(event.target.value);
  }

  const handelDeleteIdInput = (event)=>{
    setDeleteId(event.target.value);
  }

  function getDataFromJSONFile() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://672c26ca1600dda5a9f76967.mockapi.io/api/v1/books");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 200) {
        let fetchedBooks = JSON.parse(xhr.response);
        setBooks(fetchedBooks);
      }
    };
  }

  function createDataToJSONFile(){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://672c26ca1600dda5a9f76967.mockapi.io/api/v1/books");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(addBook));
    xhr.onload = () =>{
        if(xhr.status == 201){
            alert("Added");
            getDataFromJSONFile();
        }
    }
  }

  function updateDataToJSONFile(){
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", "https://672c26ca1600dda5a9f76967.mockapi.io/api/v1/books/" + updateBookId);
      xhr.setRequestHeader("content-type", "application/json");
      xhr.send(JSON.stringify(updateBook));
      xhr.onload = () => {
          if(xhr.status === 200){
              alert("Updated");
              getDataFromJSONFile();
          }
      }
  }

  function deleteDataToJSONFile(){
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", "https://672c26ca1600dda5a9f76967.mockapi.io/api/v1/books/" + deleteBookId);
      xhr.setRequestHeader("content-type", "application/json");

      xhr.onload = () => {
          if(xhr.status === 200){
              alert("Deleted");
              getDataFromJSONFile();
          }
      }
      xhr.send();
  }

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <span className="fs-4">My library</span>
        </a>
        <ul className="nav nav-pills">
          <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">Home</a></li>
          <li className="nav-item"><a href="#" className="nav-link">NoStyle</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Example</a></li>
          <li className="nav-item"><a href="#" className="nav-link">About</a></li>
        </ul>
      </header>

      <div className="d-flex justify-content-between">
        <h2>Book List</h2>
      </div>

      <div id="div_button" className="d-flex justify-content-between">
        <div className="col-2">
          <label htmlFor="bookId" className="label">Id</label>
          <input type="text" className="form-control" id="bookId" name="deleteBookId" value={deleteBookId} onChange={handelDeleteIdInput}/>
        </div>
        <div className="col-3" style={{ marginTop: "25px" }}>
          <button className="btn btn-primary" onClick={getDataFromJSONFile}>Load</button>
          <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#AddModal">Add</button>
          <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#UpdateModal">Update</button>
          <button className="btn btn-danger" onClick={deleteDataToJSONFile}>Delete</button>
        </div>
      </div>

      <hr />

      <div className="table-responsive small">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Book Title</th>
              <th scope="col">Author</th>
              <th scope="col">Publisher</th>
              <th scope="col">Publication Date</th>
            </tr>
          </thead>
          <tbody id="tb_list">
            {books.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.publisher}</td>
                <td>{item.publicationdate.substr(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-body-secondary">© 2024 Company, Inc</span>
        </div>
      </footer>

      {/* Add Modal */}
      <div className="modal fade" id="AddModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Book</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <label for="add_title" className="label">Title</label>
                <input type="text" className="form-control" id="add_title" name="title" value={addBook.title} onChange={handelAddInput}/>
              </div>
              <div>
                <label for="add_author" className="label">Author</label>
                <input type="text" className="form-control" id="add_author" name="author" value={addBook.author} onChange={handelAddInput}/>
              </div>
              <div>
                <label for="add_publisher" className="label">Publisher</label>
                <input type="text" className="form-control" id="add_publisher" name="publisher" value={addBook.publisher} onChange={handelAddInput}/>
              </div>
              <div>
                <label for="add_publicationdate" className="label">PublicationDate</label>
                <input type="date" className="form-control" id="add_publicationdate" name="publicationdate" value={addBook.publicationdate} onChange={handelAddInput}/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" onClick={createDataToJSONFile}>Add</button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <div class="modal fade" id="UpdateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Update Book</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <label for="update_Id" class="label">Id</label>
                    <input type="text" class="form-control" id="update_Id" name="updateBookId" value={updateBookId} onChange={handelUpdateIdInput}/>
                </div>
                <div>
                    <label for="update_title" class="label">Title</label>
                    <input type="text" class="form-control" id="update_title" name="title" value={updateBook.title} onChange={handelUpdateInput}/>
                </div>
                <div>
                    <label for="update_author" class="label">Author</label>
                    <input type="text" class="form-control" id="update_author" name="author" value={updateBook.author} onChange={handelUpdateInput}/>
                </div>
                <div>
                    <label for="update_publisher" class="label">Publisher</label>
                    <input type="text" class="form-control" id="update_publisher" name="publisher" value={updateBook.publisher} onChange={handelUpdateInput}/>
                </div>
                <div>
                    <label for="update_publicationdate" class="label">PublicationDate</label>
                    <input type="date" class="form-control" id="update_publicationdate" name="publicationdate" value={updateBook.publicationdate} onChange={handelUpdateInput}/>
                </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onClick={updateDataToJSONFile}>Update</button>
            </div>
        </div>
        </div>
    </div>

    </div>
  );
}
