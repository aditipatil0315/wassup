import { useState, useRef } from 'react';
import './App.css'
import { Auth } from './components/Auth'
import { Chat } from './components/Chat';
import Cookies from 'universal-cookie'
import { signOut } from 'firebase/auth';
import { auth} from './firebase-config'
import bannerImg from './assets/banner.png'
const cookies = new Cookies();




function App() {

const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
const [isRoom, setIsRoom] = useState(null);

const roomInputRef = useRef(null);

const signuserout = async() => {
  await signOut(auth)
  cookies.remove("auth-token")
  setIsAuth(false)
  setIsRoom(null)


}


  if(!isAuth) {

    return (
      <>
        <div className="main_page">
          <Auth setIsAuth={setIsAuth}/>
        </div>
      </>
    )
  }

  return ( 
    <div className="main_room">

      {isRoom != null ? <Chat isRoom={isRoom}/> : 
        (<div>
            <div className="enter_room">
              <div className="left">
              <div className="banner">
                <h2>Chat, <br /> Connect, <br /> Grow.</h2>
                  <div className="image">
                    <img src= {bannerImg} alt="" />
                  </div>
                </div>
              
              </div>
              <div className="right">
              <label >Enter Room name</label>
              <input ref={roomInputRef} type="text" placeholder='Enter the room name' />
              <button className='enter_room' onClick={() => setIsRoom(roomInputRef.current.value)} >Enter Chat Room</button>
                

              </div>
            </div>

        </div>)}

        <div className="signout_box">
          <button onClick={signuserout}>Sign Out</button>
        </div>

    </div>
  )
}

export default App
