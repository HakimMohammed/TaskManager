import { 
    ReactNode,
    useEffect,
    useState,
    createContext,
    useContext
} from "react";

import  {auth}  from '../../firebase/firebase'

import { 
    Auth,
    UserCredential,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

export interface UserStateContext {
    isAuthenticated: boolean,
    isLoading: boolean,
    id?: string,
}

export const UserStateContext = createContext<UserStateContext>(
    {} as UserStateContext
);

export interface AuthContext {
    auth: Auth,
    currentUser: User | null,
    signIn: (email: string, password: string) => Promise<UserCredential>
    signUp: (email: string, password: string) => Promise<UserCredential>
    signOut: () => void
}

export const AuthContext = createContext<AuthContext>(
    {} as AuthContext
)

export function useAuth(): AuthContext {
    return useContext(AuthContext)
}

export interface AuthProviderProps {
    children?: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [currentUser, setCurrentUser] = useState<User |null>(null)

    function signUp(email: string, password: string): Promise<UserCredential> {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function signIn(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOut = async () => {
        await auth.signOut();
    } 

    useEffect(()=>{
        const unsibscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
        });

        return unsibscribe;
    },[])

    const values = {
        signUp,
        currentUser,
        signIn,
        auth,
        signOut
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useUserContext = (): UserStateContext => {
    return useContext(UserStateContext)
}