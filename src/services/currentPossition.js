import { createContext, useContext, useState } from "react";

const createPosition = createContext();
const {Provider} = createPosition

const CurrentPosition = ({children}) => {
    const [userRole, setUserRole] = useState()

    const setRole = (role) => {
        setUserRole(role)
    }

    return (
        <Provider value={{userRole, setRole, setUserRole}}>
            {children}
        </Provider>
    );   
};

const useRole = () => {
    const context = useContext(createPosition)
    return context
}

export { CurrentPosition, useRole };