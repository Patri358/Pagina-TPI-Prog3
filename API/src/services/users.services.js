import { Users } from "../models/Users.js";

export const findUsuarios = async (req, res) => {
    try {
        const usuarios = await Users.findAll();
        res.json(usuarios);
    } catch (err) {
        console.error(err)
        return res.status(500).json({ mensaje: "Error en el servidor al traer los usuarios" })
    }
}

export const findUsuarioEmail = async (req, res) => {
    try {
        const { email } = req.params

        const User = await Users.findOne({ where: { email } })

        if (!User) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" })
        }

        res.json(User)

    } catch (err) {
        console.error(err)
        return res.status(500).json({ mensaje: "Error en el servidor al traer el usuario" })
    }
}

export const actualizarUsuarioRol = async (req, res) => {

    try {
        const { id } = req.params

        const { rol } = req.body

        if (!rol) {
            return res.status(400).json({ mensaje: "El rol es obligatorio" })
        }

        const rolesObligatorios = ["user", "admin", "superAdmin"]
        if (!rolesObligatorios.includes(rol)) {
            return res.status(400).json({ mensaje: "Los roles deben ser: user, admin o superAdmin" })
        }

        const User = await Users.findByPk(id)

        if (!User) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" })
        }

        User.rol = rol

        await User.save()

        return res.json({ mensaje: `Rol actualizado a ${rol}` })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ mensaje: "Error en el servidor al actualizar usuario" })
    }
}

export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const Usuario = await Users.findByPk(id);

        if (!Usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" })
        }

        await Usuario.destroy();

        res.json({ mensaje: `Usuario con el id: ${id} eliminado` })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ mensaje: "Error en el servidor al eliminar usuario" })
    }
}