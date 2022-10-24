import Container from "@mui/material/Container";
import {Routes,Route} from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import {useDispatch,useSelector} from 'react-redux'
import React from 'react'
import {selectIsAuth,fetchAuthMe}from './redux/slice/auth'
function App() {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  React.useEffect(()=>{
dispatch(fetchAuthMe())
  },[])
  return (
    <>
      <Header />

      <Container maxWidth="lg">
          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/posts/:id' element={<FullPost />}/>
              <Route path='/posts' element={<AddPost />}/>
              <Route path='/register' element={<Registration />}/>
              <Route path='/login' element={<Login />}/>

          </Routes>
      </Container>
    </>
  );
}

export default App;
