import { Button } from "react-bootstrap";
import { useContext } from "react";
import { GamesContext } from "../../../context/GamesProvider/GamesContext";

const JuegosLista = ({ game }) => {

    const { handleDelete } = useContext(GamesContext);

    return (
        <div style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "15px", width: "100%" }}>

                {/* Mitad Izquierda (Título del juego alineado a la derecha) */}
                <div style={{ width: "50%", textAlign: "right" }}>
                    <h2 style={{ color: "white", margin: 0, fontSize: "1.2rem" }}>
                        {game.title}
                    </h2>
                </div>

                {/* Mitad Derecha (Botones alineados a la izquierda) */}
                <div style={{ width: "50%", textAlign: "left", display: "flex", alignItems: "center" }}>
                    <Button onClick={() => handleDelete(game)} variant="danger" size="sm">Eliminar</Button>
                    <Button style={{ marginLeft: "10px" }} size="sm">Editar</Button>
                </div>

            </div>

            {/* Línea divisoria idéntica para mantener la coherencia visual */}
            <hr style={{ color: "white", opacity: 0.2, marginTop: "12px", marginBottom: "12px" }} />
        </div>
    );
};

export default JuegosLista;