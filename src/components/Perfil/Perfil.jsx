const Perfil = ({ perfil }) => {

    // datos del usuario
    console.log(perfil);

    const esAdmin = perfil.rol === "admin" || perfil.rol === "superadmin"
    return (
        <div>
            <h2> Nombre: {perfil.username} </h2>
            <p> Email: {perfil.email}</p>
        </div>
    );
};

export default Perfil;