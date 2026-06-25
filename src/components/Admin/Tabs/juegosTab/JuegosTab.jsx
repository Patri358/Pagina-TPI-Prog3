import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GamesContext } from "../../../../context/GamesProvider/GamesContext";
import { Button } from "react-bootstrap";
import JuegosLista from "../../juegosLista/JuegosLista"

const JuegosTab = () => {
    const navigate = useNavigate()

    const { games } = useContext(GamesContext);

    const handleAddGame = () => {
        navigate("/gameForm");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "20px 10px", maxWidth: "450px", margin: "0 auto" }}>
            <Button onClick={handleAddGame} style={{ alignSelf: "center", paddingLeft: "30px", paddingRight: "30px", marginBottom: "10px" }}>
                Agregar Juego
            </Button>

            {games.map((game) => (
                <JuegosLista key={game.id} game={game} />
            ))}
        </div>
    )
}

export default JuegosTab;