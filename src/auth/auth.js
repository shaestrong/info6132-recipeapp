import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export default function (app) {
    const auth = getAuth(app);

    const createNewUser = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }

    const listenAuthState = (callback) => {
        onAuthStateChanged(auth, callback);
    }

    const getUser = () => {
        return auth.currentUser;
    }

    return {
        createNewUser,
        login,
        listenAuthState,
        getUser,
        logout
    }
}