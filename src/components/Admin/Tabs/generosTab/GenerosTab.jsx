import { useState, useEffect, useContext } from "react";
import { GamesContext } from "../../../../context/GamesProvider/GamesContext";
import { Button, Form } from "react-bootstrap";
import { successToast, errorToast } from "../../../../ui/Toast/Toast.jsx";
import GenerosLista from "../../generosLista/GenerosLista.jsx"

const GenerosTab = () => {

    const [agregarGenero, setAgregarGenero] = useState(false);
    const { generosDescripcion, setGenerosDescripcion } = useContext(GamesContext);

    const traerToken = () => {
        return localStorage.getItem("token");
    };

    const handleMostrar = () => setAgregarGenero(true);
    const handleCancelar = () => setAgregarGenero(false);

    const handleDeleteGenero = (id) => {

        if (!id) {
            errorToast("ID inválido")
            return;
        }

        const token = traerToken();

        if (!token || token === "null" || token === "undefined") {
            errorToast("Sesión inválida o expirada.");
            return;
        }

        fetch(`http://localhost:3001/generos/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("No se pudo eliminar el género");
                }
                // por si el backend responde sin el json
                return res.json().catch(() => ({}));
            })
            .then(() => {
                successToast("Género borrado")
                setGenerosDescripcion((prevGeneros) => prevGeneros.filter((G) => G.id !== id))
            })
            .catch((err) => {
                console.error(err)
                errorToast(err || "Error en el servidor al borrar el género")
            })

    };

    const handle = 1

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "20px 10px", maxWidth: "450px", margin: "0 auto" }}>
            <Button onClick={agregarGenero ? handleCancelar : handleCancelar} variant={agregarGenero ? "danger" : "primary"} style={{ alignSelf: "center", paddingLeft: "30px", paddingRight: "30px", marginBottom: "10px" }}>
                {
                    agregarGenero ? "Cancelar" : "Agregar Género"
                }
            </Button>

            {agregarGenero && (
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", width: "100%", marginBottom: "20px" }}>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre del nuevo género"
                        size="sm"
                    />
                    <Button variant="success" size="sm">Guardar</Button>
                </div>
            )}

            {generosDescripcion.map((genero) => (
                <GenerosLista key={genero.id} id={genero.id} descripcion={genero.descripcion} onDeleteGenero={handleDeleteGenero} />
            ))}
        </div>
    )
}

export default GenerosTab;