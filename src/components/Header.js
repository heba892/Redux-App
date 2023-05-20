import {React , Fragment} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {LogInOut} from '../store/authSlice'
const Header = () => {

  const {isLoggin} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const {error} = useSelector((state) => state.books)

  return (

    <Fragment>
{  error &&  (<div className='alert alert-danger' role="alert">{error}</div>)}  
  <nav className='navbar navbar-dark bg-dark'>
      <span className='navbar-brand mb-0 h1'>My Books</span>

      <button className='btn btn-outline-primary' type='submit' onClick={() => dispatch(LogInOut())}>
        {isLoggin ? 'logout' : 'login'}
      </button>
    </nav>
    </Fragment>
    
  );
};

export default Header;
