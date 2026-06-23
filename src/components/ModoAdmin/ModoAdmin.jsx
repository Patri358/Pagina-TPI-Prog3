import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserCard from '../userCard/userCard';
import { useContext } from 'react';
import { GamesContext } from '../../context/GamesProvider/GamesContext';

const ModoAdmin = ({ usuarios }) => {

    const {generosDescripcion, games} = useContext(GamesContext)

    return (
        <Tabs
            defaultActiveKey="users"
            id="ventanas-admin"
            className="mb-3"
            fill
        >
            <Tab eventKey="users" title="Usuarios">
                <div className='p-3'>
                    {
                        usuarios.map((usuario) => {
                            return (
                                <UserCard key={usuario.id} user={usuario}/>
                            )
                        })
                    }
                </div>
            </Tab>


            <Tab eventKey="generos" title="Géneros">
                {
                    generosDescripcion.map((genero) => {
                        return(
                            <div key={genero.id}>
                                <h2 style={{color:"white"}}>{genero.descripcion}</h2>
                            </div>
                        )
                    })
                }
            </Tab>

            <Tab eventKey="juegos" title="Juegos">
                {
                    games.map((game) => {
                        return(
                            <div>
                                <h2 style={{color:"white"}}>{game.title}</h2>
                            </div>
                        )
                    })
                }
            </Tab>
        </Tabs>
    );
}

export default ModoAdmin;