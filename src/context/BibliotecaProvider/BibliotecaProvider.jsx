import { useEffect, useState } from "react";
import { BibliotecaContext } from "./BibliotecaContext";

const BibliotecaProvider = ({ children, loggedIn }) => {
    const traerToken = () => localStorage.getItem("token");

    const [myGames, setMyGames] = useState([]);

    useEffect(() => {

        // para limpiar la biblioteca si cierra sesion
        if(!loggedIn){
            setMyGames([])
            return;
        }

        const token = traerToken();

        // esto es para que al entrar la pagina por primera vez no tire error
        // se ponen entre comillas porque el localStorage guarda strings
        if (!token || token === "null" || token === "undefined") {
            return;
        }

        fetch("http://localhost:3001/compras", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error en el servidor: ${res.status}`);
                }
                return res.json();
            })
            .then((historialCompras) => {
                // esto devuelve un array de compras y cada compra tiene sus detalles
                const juegosComprados = [];

                historialCompras.forEach((compra) => {
                    // verifica si existen detalles
                    if (compra.DetalleCompras) {
                        compra.DetalleCompras.forEach((detalle) => {
                            // Si el juego existe dentro del detalle y no lo agregamos antes, lo guardamos
                            if (detalle.Juego && !juegosComprados.some(j => j.id === detalle.Juego.id)) {
                                juegosComprados.push(detalle.Juego);
                            }
                        });
                    }
                });

                setMyGames(juegosComprados);
            })
            .catch((err) => {
                console.error("Error al cargar la biblioteca:", err);
            });
    }, [loggedIn]);

    return (
        <BibliotecaContext.Provider value={{ myGames, setMyGames }}>
            {children}
        </BibliotecaContext.Provider>
    )
}

export default BibliotecaProvider;