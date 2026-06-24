import { Card, Button, Badge, Modal } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../../../context/CartProvider/CartContext";
import { useNavigate } from "react-router-dom";
import { GamesContext } from "../../../context/GamesProvider/GamesContext";
import { BibliotecaContext } from "../../../context/BibliotecaProvider/BibliotecaContext";
import useModal from "../../../services/useModal/useModal";
import ModalDelete from "../../../ui/ModalDelete/ModalDelete";
import ModalDetalle from "../../../ui/modalDetalle/ModalDetalle";

const CardTienda = ({ game, tienePermiso }) => {

    const navigate = useNavigate()

    const { handleCart } = useContext(CartContext);
    const { handleEdit, handleDelete } = useContext(GamesContext);
    const { myGames } = useContext(BibliotecaContext)

    // verifica si algun id coincide con este juego
    const yaComprado = myGames.some((juego) => juego.id === game.id)

    const handleEditGame = () => {
        handleEdit()
        navigate("/gameForm")
    }

    // llamo al customHook del modal
    const { handleAbrir: handleAbrirEliminar, handleCerrar: handleCerrarEliminar, estadoModal: estadoModalEliminar } = useModal()
    const { handleAbrir: handleAbrirDetalle, handleCerrar: handleCerrarDetalle, estadoModal: estadoModalDetalle } = useModal()

    return (
        <Card text="white" style={{ width: '28rem', marginTop: "30px" }} className='mx-3'>

            <Card.Img variant="top" src={game.poster} />

            {/* Modal de confirmar eliminar */}
            {estadoModalEliminar && <ModalDelete game={game} onCerrar={handleCerrarEliminar} onConfirmar={() => handleDelete(game)} show={estadoModalEliminar} titulo={`¿Desea eliminar ${game.title} de la tienda?`} />}

            {/* Modal de detalle del juego */}{
                estadoModalDetalle && <ModalDetalle game={game} onCerrar={handleCerrarDetalle} show={estadoModalDetalle} />
            }

            <Card.Body>

                <Card.Title className="text-center">{game.title}</Card.Title>

                <Card.Subtitle className="text-center fs-2 my-3" >
                    <Badge bg="success">
                        {
                            yaComprado ? "Comprado" : (game.price === 0 ? "Gratuito" : `$${game.price}`)
                        }
                    </Badge>
                </Card.Subtitle>

                <Card.Text>
                    {game.sinopsis || game.synopsis}
                </Card.Text>

                <Card.Subtitle className="text-center" style={{ marginBottom: "30px" }}>
                    Distribuidor: {game.distributor}
                </Card.Subtitle>

                <Card.Text> Categoría: {game.rating} </Card.Text>

                <Card.Text>
                    <Badge pill bg="secondary">
                        Géneros: #{(game.Generos ?? [])
                            .map((genero) => typeof genero === "string" ? genero : genero.descripcion)
                            .join(" #")}
                    </Badge>
                </Card.Text>

                <Card.Footer>
                    {/* botones que ve el admin | superadmin */}
                    {tienePermiso && (
                        <div className="d-flex justify-content-center gap-4">
                            <Button variant="danger" onClick={handleAbrirEliminar} >Eliminar de la tienda</Button>
                            <Button variant="success" onClick={handleEditGame} >Editar juego</Button>
                        </div>
                    )}

                    <Button style={{ margin: "10px", width: "100%" }} variant="primary" onClick={handleAbrirDetalle}>Detalles del juego</Button>

                    <Button onClick={() => handleCart(game)} variant="light" style={{ margin: "10px", width: "100%" }} disabled={yaComprado}>
                        {
                            yaComprado ? "Juego en la biblioteca" : "Añadir al carrito"
                        }    
                    </Button>
                </Card.Footer>
            </Card.Body>

        </Card >
    )
}

export default CardTienda;