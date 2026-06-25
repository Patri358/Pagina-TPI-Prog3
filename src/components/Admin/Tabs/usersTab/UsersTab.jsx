import { useState, useEffect } from "react";
import { successToast, errorToast } from "../../../../ui/Toast/Toast";
import UserCard from "../../userCard/userCard";

const UsersTab = ({ esSuperAdmin }) => {

    const [users, setUsers] = useState([]);

    const traerToken = () => {
        return localStorage.getItem("token");
    };

    useEffect(() => {
        const token = traerToken();

        if (!token || token === "null" || token === "undefined") {
            errorToast("Sesión inválida o expirada.");
            return;
        }

        fetch("http://localhost:3001/users", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                // verifica si devuelve un array
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error("Error en el backend, datos corruptos: ", data);
                }
            })
            .catch((err) => {
                errorToast("Error en el fetch de usuarios:", err)
            });
    }, []);

    const handleUpdateRol = (nuevoRol, usuarioId) => {

        const token = traerToken();

        if (!token || token === "null" || token === "undefined") {
            errorToast("Sesión inválida o expirada.");
            return;
        }

        fetch(`http://localhost:3001/users/${usuarioId}/rol`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ rol: nuevoRol })
        })
            .then((res) => {
                if (!res.ok) {
                    errorToast(`Error al actualizar el rol del usuario ${usuarioId}`);
                    return;
                }
                // Si la respuesta es ok, actualizo el front
                setUsers((prevUsuarios) =>
                    prevUsuarios.map((u) =>
                        u.id === usuarioId ? { ...u, rol: nuevoRol } : u
                    )
                )
            })
            .catch((err) => {
                errorToast("Error al actualizar el rol: ", err)
            })
    };

    const handleDeleteUser = (id) => {
        const token = traerToken();

        if (!token || token === "null" || token === "undefined") {
            errorToast("Sesión inválida o expirada.");
            return;
        }

        fetch(`http://localhost:3001/users/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al eliminar el usuario o permisos insuficientes");
                }
                return res.json().catch(() => ({}));
            })
            .then(() => {
                // actualizo el front si todo está ok
                setUsers((prevUsuarios) => prevUsuarios.filter((u) => u.id !== id));
                successToast(`Usuario eliminado con éxito`);
            })
            .catch((err) => {
                console.error("Error al eliminar usuario: ", err);
                errorToast(err.message || "Error en el servidor");
            });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "20px 10px", maxWidth: "450px", margin: "0 auto" }}>
            {users.map((usuario) => (
                <UserCard key={usuario.id} user={usuario} esSuperAdmin={esSuperAdmin} onUpdateRol={handleUpdateRol} onDeleteUser={handleDeleteUser} />
            ))}
        </div>
    )
}

export default UsersTab;