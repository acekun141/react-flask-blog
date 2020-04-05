import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Header = () => {
    return (
        <div className="header">
            <Logo />
            <NavBar />
        </div>
    );
};

export const Logo = () => {
    return (
        <div className="logo">
            <a href="/" className="logo-icon">
                TodoApp
            </a>
        </div>
    );
};

export const NavBar = () => {
    const [navItems, setNavItems] = useState([]);
    const user = useSelector(state => state.user);
    useEffect(() => {
        if (user.username) {
            setNavItems([
                {id: 3, name: user.username, href: "/"},
                {id: 4, name: "Log out", href: "/logout"}
            ]);
        } else {
            setNavItems([
                {id: 1, name: "Sign In", href: "/signin"},
                {id: 2, name: "Sign Up", href: "/signup"}
            ]);
        }
    }, [user])
    return (
        <ul className="navbar">
            {navItems.map(item => (
                <NavItem key={item.key} item={item} />
            ))}
        </ul>
    );
};

export const NavItem = (props) => {
    return (
        <li className="navbar-item">
            <Link to={props.item.href} className="navbar-item__link">{props.item.name}</Link>
        </li>
    );
};

export default Header;