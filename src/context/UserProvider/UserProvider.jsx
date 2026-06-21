import { useContext } from "react"

const UserProvider = ({ children }) => {

    return (
        <UserContext.Provider>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider