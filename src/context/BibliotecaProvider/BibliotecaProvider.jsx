import { useState } from "react";
import { BibliotecaContext } from "./BibliotecaContext";

const BibliotecaProvider = ({ children }) => {

    const [myGames, setMyGames] = useState([]);

    return (
        <BibliotecaContext.Provider value={{ myGames, setMyGames }}>
            {children}
        </BibliotecaContext.Provider>
    )
}

export default BibliotecaProvider;