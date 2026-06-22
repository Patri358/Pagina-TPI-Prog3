import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = ({ isLog }) => {

    const navigate = useNavigate();

    const handleBack = () => {
        if (!isLog) {
            navigate("/login")
        }
        navigate("/tienda")
    }

    return (
        <div className="text-center mt-3">
            <h2 style={{ color: "white" }}>Página no encontrada</h2>
            <Button onClick={handleBack} className="text-center">
                {isLog ? "Volver a la tienda" : "Volver al inicio de sesión"}
            </Button>
        </div>
    )
}

export default NotFound;