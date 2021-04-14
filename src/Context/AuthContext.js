import React, { useEffect } from 'react';
import firebase from 'firebase';
import { useState, createContext } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const provider = new firebase.auth.GoogleAuthProvider();


    // Sign-In and Sign-Up funtions
    function signIn(email,password) {
        return auth.signInWithEmailAndPassword(email,password);
    }
    async function signUp(email, password) {
        setLoading(true);
        let result = await auth.createUserWithEmailAndPassword(email, password);
        setLoading(false);
        return result;
    }
    function signInWithGoogle() {
        return firebase.auth()
        .signInWithPopup(provider);
    }

    // Logout function

    function signOut() {
        firebase.auth().signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
        });

        return unsubscribe;
    }, []);
    

    return (
        <AuthContext.Provider value={{user,loading, signIn, signUp, signInWithGoogle, signOut, setLoading}}>
            {props.children}
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;
