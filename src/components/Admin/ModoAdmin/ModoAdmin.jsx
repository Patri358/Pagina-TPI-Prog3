import { Tab, Tabs } from 'react-bootstrap';
import UsersTab from '../Tabs/usersTab/UsersTab';
import GenerosTab from '../Tabs/generosTab/GenerosTab';
import JuegosTab from '../Tabs/juegosTab/JuegosTab';

const ModoAdmin = ({ esSuperAdmin }) => {


    return (
        <Tabs defaultActiveKey="users" id="ventanas-admin" className="mb-3" fill>


            <Tab eventKey="users" title="Usuarios">
                <UsersTab esSuperAdmin={esSuperAdmin} />
            </Tab>


            <Tab eventKey="generos" title="Géneros">
                <GenerosTab />
            </Tab>

            <Tab eventKey="juegos" title="Juegos">
                <JuegosTab />
            </Tab>

        </Tabs>
    );
};

export default ModoAdmin;