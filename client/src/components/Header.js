import { Navbar, NavbarBrand } from 'reactstrap';

function Header() {

    return(
        <header>
            <Navbar color="dark" expand="md" dark>
                <NavbarBrand href="/" >
                    <h1>Chatroom App</h1>
                </NavbarBrand>
            </Navbar>
        </header>
    );
}

export default Header;