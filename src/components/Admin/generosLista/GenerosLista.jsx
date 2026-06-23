import { Button, Form } from 'react-bootstrap';

const GenerosLista = ({ descripcion, estaAgregando }) => {
    return (
        <div style={{ width: "100%" }}>
            {estaAgregando ? (
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", width: "100%", maxWidth: "400px", margin: "0 auto", marginBottom: "20px" }}>
                    <Form.Control
                        type="text"
                        defaultValue={descripcion}
                        placeholder="Nombre del género"
                        size="sm"
                    />
                    <Button variant="success" size="sm">Guardar</Button>
                    <Button variant="secondary" size="sm">Cancelar</Button>
                </div>
            ) : (
                <>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "15px", width: "100%" }}>
                        <div style={{ width: "50%", textAlign: "right" }}>
                            <h2 style={{ color: "white", margin: 0, fontSize: "1.2rem" }}>
                                {descripcion}
                            </h2>
                        </div>
                        <div style={{ width: "50%", textAlign: "left", display: "flex", alignItems: "center" }}>
                            <Button variant="danger" size="sm">Eliminar</Button>
                            <Button style={{ marginLeft: "10px" }} size="sm">Editar</Button>
                        </div>
                    </div>

                    <hr style={{ color: "white", opacity: 0.2, marginTop: "12px", marginBottom: "12px" }} />
                </>
            )}
        </div>
    );
};

export default GenerosLista;