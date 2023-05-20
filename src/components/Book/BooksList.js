import React from 'react';
import {useDispatch } from 'react-redux';

const BooksList = ({isLoading , books , isLoggin , deleteBook , getBookId}) => {
    const dispatch = useDispatch();


  const bookList = books.length > 0 ? books.map((item) => (
 <li className='list-group-item d-flex  justify-content-between align-items-center' key={item.id}>
          <div>{item.title}</div>
          <div className='btn-group' role='group'>
            <button type='button' className='btn btn-primary' onClick={() => getBookId(item.id)}>
              Read
            </button>
            <button
             type='button'
             className='btn btn-danger'
             disabled={!isLoggin}
           onClick={() => dispatch(deleteBook(item))
            .unwrap()
            .then((originalPromiseResult)=> {
              console.log(originalPromiseResult)
            })
            .catch((rejectedValueOrSerializedError) => {
              console.log(rejectedValueOrSerializedError)
            })
          
          }
             >
              Delete
            </button>
          </div>
        </li>
  )) : "there is no books available";
  return (
    <div>
      <h2>Books List</h2>
      {
        isLoading ?( "loading...") : (
<ul className='list-group'>
{bookList}
      </ul>
        )
      }
      
    </div>
  );
};

export default BooksList;
