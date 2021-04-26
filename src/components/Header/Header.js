import React from 'react';
import {Row, Col, Container} from 'reactstrap';
import Logo from "../Logo/Logo";
import SearchPanel from "../SearchPanel/SearchPanel";

import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <Container>
            <div className="header__inner">
                <div className="header__logo">
                    <Logo/>
                </div>
                <nav className="header__menu">
                    <ul>
                        <li>
                            <a href="#">Мои товары</a>
                        </li>
                        <li>
                            <a href="#">Выйти</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <Row>
                <SearchPanel/>
            </Row>
            </Container>
        </div>
    )
}

export default Header;