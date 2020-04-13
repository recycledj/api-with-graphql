import React from 'react';
import { Link } from 'react-router-dom';
import '../../spinner.css';
const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex">
        <div className="container">
            <Link to="/" className="navbar-brand text-light font-weight-bold">
                UpData
            </Link>
        </div>
        <div className="collapse navbar-collapse col-md-8" id="navigation">
            <ul className="navbar-nav ml-auto text-right">
                <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle text-light cursor-pointer" data-toggle="dropdown">Clientes</Link>
                    <div className="dropdown-menu">
                            <Link to="/clientes" className="dropdown-item">
                                Ver clientes
                            </Link>
                            <Link to="/cliente/nuevo" className="dropdown-item">
                                Nuevo cliente
                            </Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle text-light cursor-pointer" data-toggle="dropdown">Productos</Link>
                    <div className="dropdown-menu">
                        <Link to="/productos" className="dropdown-item">
                            Ver productos
                        </Link>
                        <Link to="/productos/nuevo" className="dropdown-item">
                            Nuevo producto
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
);

export default Header;