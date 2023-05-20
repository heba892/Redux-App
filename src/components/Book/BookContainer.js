import React, { Fragment , useEffect , useState} from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import {useDispatch , useSelector} from 'react-redux';
import {getBooks , deleteBook} from '../../store/bookSlice'
import './book.css';

const PostContainer = () => {
  const [selected , setSelected] = useState(null);
  const dispatch = useDispatch();
 const {isLoading , books} = useSelector((state) => state.books)
 const {isLoggin} = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getBooks())
  },[dispatch])



const getBookId = (id) =>{
  const selectedBooks = books.find((item) => item.id === id);
  setSelected((prev) => {return {...prev , ...selectedBooks}})
}

  return (
    <Fragment>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList
           isLoading={isLoading}
            books={books} 
            isLoggin={isLoggin}
             deleteBook={deleteBook} 
             dispatch={dispatch}
               getBookId ={getBookId}

             />
        </div>
        <div className='col side-line'>
          <BookInfo info={selected}/>
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
