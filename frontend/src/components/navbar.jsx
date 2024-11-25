import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('auth-token'); // Check token presence
    console.log(window.localStorage);
    console.log(isLoggedIn);
    
    console.log(localStorage.getItem('auth-token'));
    
    
    const handleLogout = () => {
        localStorage.removeItem('auth-token'); // Remove token on logout
        console.log(localStorage.getItem('auth-token'));
        navigate("/login"); // Redirect to login
    };

    const loadCart = () => {
        setCartView(true);
    };

    const items = useCart();

    return (
        <div>
            <nav
                className="navbar navbar-expand-lg navbar-dark bg-black position-sticky"
                style={{
                    boxShadow: "0px 10px 20px black",
                    position: "fixed",
                    zIndex: "10",
                    width: "100%",
                }}
            >
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 fst-italic" to="/">
                        CanTech
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link fs-5 mx-3 active"
                                    aria-current="page"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link fs-5 mx-3 active"
                                        aria-current="page"
                                        to="/myorder"
                                    >
                                        My Orders
                                    </Link>
                                </li>
                            )}
                        </ul>
                        {!isLoggedIn ? (
                            <div className="d-flex">
                                <Link className="btn bg-white text-success mx-1" to="/login">
                                    Login
                                </Link>
                                <Link className="btn bg-white text-success mx-1" to="/creatuser">
                                    Signup
                                </Link>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center">
                                <button
                                    className="btn bg-white text-success mx-2"
                                    onClick={loadCart}
                                >
                                    <Badge color="secondary" badgeContent={items.length}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </button>
                                {cartView && (
                                    <Modal onClose={() => setCartView(false)}>
                                        <Cart />
                                    </Modal>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="btn bg-white text-success"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
