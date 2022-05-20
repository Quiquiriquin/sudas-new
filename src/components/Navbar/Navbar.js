import React, { useContext } from 'react';
import 'boxicons';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
// import Logo from '../Shared/Logos/Logo';
import './Navbar.scss';
import { SessionContext } from '../../context/SessionContext';
import { GeneralContext } from '../../context/GeneralContext';

const Navbar = () => {
  const { user } = useContext(GeneralContext);
  const { updateSession } = useContext(SessionContext);
  const openNavbar = () => {
    const menu = document.querySelector('#menu');
    const sidebar = document.querySelector('.sidebar');
    menu.onclick = () => {
      sidebar.classList.toggle('active');
    };
  };

  return (
    <div className="sidebar">
      <div className="logo_content">
        <div className="logo">
          {/* <div className={'logo-img'}> */}
          {/*  <Logo short /> */}
          {/* </div> */}
          <div className="logo_name">ENCB</div>
        </div>
        <box-icon onClick={openNavbar} id="menu" name="menu" />
        <ul className="nav-list">
          <li>
            <NavLink to="/" exact activeClassName="active">
              <box-icon type="solid" name="grid-alt" />
              <span className="links_name">Dashboard</span>
            </NavLink>
            <span className="tooltip">Dashboard</span>
          </li>
          {user && user.role === 'ADMIN' && (
            <>
              <li>
                <NavLink to="/usuarios" activeClassName="active">
                  <box-icon type="solid" name="user-detail" />
                  <span className="links_name">Usuarios</span>
                </NavLink>
                <span className="tooltip">Usuarios</span>
              </li>
              <li>
                <NavLink
                  to="/planes-academicos"
                  activeClassName="active"
                >
                  <box-icon type="solid" name="map-alt" />
                  <span className="links_name">
                    Planes académicos
                  </span>
                </NavLink>
                <span className="tooltip">Planes académicos</span>
              </li>
              <li>
                <NavLink
                  to="/unidades-aprendizaje"
                  activeClassName="active"
                >
                  <box-icon type="solid" name="book-alt" />
                  <span className="links_name">
                    Unidades de aprendizaje
                  </span>
                </NavLink>
                <span className="tooltip">
                  Unidades de aprendizaje
                </span>
              </li>
              <li>
                <NavLink to="/verbos" activeClassName="active">
                  <box-icon name="message-square-dots" />
                  <span className="links_name">Verbos</span>
                </NavLink>
                <span className="tooltip">Verbos</span>
              </li>
            </>
          )}
          {user && user.role !== 'ADMIN' && (
            <li>
              <NavLink to="/detalle-unidad-aprendizaje/1">
                <box-icon type="solid" name="book-open" />
                <span className="links_name">Detalle UA</span>
              </NavLink>
              <span className="tooltip">Detalle UA</span>
            </li>
          )}
          {/* <li>
            <Link to="/movimientos" activeClassName="active">
              <box-icon type="solid" name="spreadsheet" />
              <span className="links_name">Target prices</span>
            </Link>
            <span className="tooltip">Target prices</span>
          </li> */}
          {/* <li> */}
          {/*  <NavLink to="/usuario" activeClassName="active"> */}
          {/*    <box-icon type="solid" name="user-circle" /> */}
          {/*    <span className="links_name">Usuario</span> */}
          {/*  </NavLink> */}
          {/*  <span className="tooltip">Usuario</span> */}
          {/* </li> */}
        </ul>
      </div>
      <ul style={{ bottom: '0' }} className="absolute">
        <li>
          <NavLink
            to="/auth"
            activeClassName="active"
            onClick={() => {
              updateSession(undefined);
              Cookies.remove('session');
            }}
          >
            <box-icon type="solid" name="log-out" />
            <span className="links_name">Usuarios</span>
          </NavLink>
          <span className="tooltip">Cerrar sesión</span>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
