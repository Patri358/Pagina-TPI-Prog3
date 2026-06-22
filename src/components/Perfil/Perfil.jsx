const Perfil = ({ perfil }) => {
    
    // datos del usuario
    console.log(perfil);

    const esAdmin = perfil.rol === "admin" || perfil.rol === "superadmin"
    return (
        <div>
        </div>
    );
};

export default Perfil;