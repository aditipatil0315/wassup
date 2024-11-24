import react, { useEffect, useState } from 'react';
import './Chat.css'
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from 'firebase/firestore'
import {auth, db} from '../firebase-config'
import bannerImg from '../assets/banner.png'


export const Chat = ({isRoom}) => {

    const [newMessage, setNewMessage]  = useState();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const queryMessages = query(collection(db, 'messages'), where('room' , '==' , isRoom),orderBy("time"));
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages =[];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            })

            setMessages(messages)

        })

        return () => unsuscribe();
    }, [])


    const handleSubmit = async(e) => {
        e.preventDefault();
        if(newMessage === "") return;
        const x = await addDoc(collection(db, 'messages'), {
            text: newMessage,
            time: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: isRoom
        })

        setNewMessage("");
    }



    return (
        <div className='chat_room'>
                            <h3 className='heading'>Welcome to {isRoom} -</h3>


<div className="left">
              <div className="banner">
                <h2>Chat, <br /> Connect, <br /> Grow.</h2>
                  <div className="image">
                    <img src= {bannerImg} alt="" />
                  </div>
                </div>
              
              </div>

              <div className="right">

              <div className="messges_container">
            
            {messages.map((message) => (
                <div className="message_box" key={message.id}>
                    <span>{message.user} -</span>
                    <h1>{message.text}</h1>
                    {/* <p>{message.time}</p> */}

                </div>
            ))}
        </div>

        <form className='chatroom_form' onSubmit={handleSubmit}>
            <input type="text" 
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder='Type you message here...'
            value={newMessage}/>
            <button className='submit_btn' type='submit' >Send</button>
            
        </form>

              </div>
    
           
        
        
        </div>
    )
}