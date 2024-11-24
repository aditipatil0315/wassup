import react from 'react';
import './Auth.css'
import {auth , googleProvider} from '../firebase-config.js'
import {signInWithPopup} from 'firebase/auth'
import Cookies from 'universal-cookie'
const cookies = new Cookies();

export const Auth = ({setIsAuth}) => {

    const signInWithGoogle = async() => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            cookies.set('auth-token', result.user.refreshToken)
            setIsAuth(true)
        } catch (err) {
            console.error(err);
        }
        

    }

    return (
        <>

        <div className="auth_box">
            <div className="main_box">
                <h3>Wassup.</h3>
                <p>Where Conversations Flow and Connections Grow.</p>
                <br />
            {/* <p>Sign In with Google to continue</p> */}
            <button onClick={signInWithGoogle}>Sign In</button>
            </div>
        </div>
        
        </>


    )

}