import React, { useContext } from 'react';
import 'boxicons';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
// import Logo from '../Shared/Logos/Logo';
import './Navbar.scss';
import { Tooltip } from 'antd';
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
            <Tooltip
              overlayClassName="nav-tooltip"
              placement="right"
              title="Dashboard"
            >
              <NavLink to="/" exact activeClassName="active">
                <box-icon type="solid" name="grid-alt" />
                <span className="links_name">Dashboard</span>
              </NavLink>
            </Tooltip>
          </li>
          {user && user.role === 'ADMIN' && (
            <>
              <li>
                <Tooltip
                  overlayClassName="nav-tooltip"
                  placement="right"
                  title="Usuarios"
                >
                  <NavLink to="/usuarios" activeClassName="active">
                    <box-icon type="solid" name="user-detail" />
                    <span className="links_name">Usuarios</span>
                  </NavLink>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  overlayClassName="nav-tooltip"
                  placement="right"
                  title="Planes académicos"
                >
                  <NavLink
                    to="/planes-academicos"
                    activeClassName="active"
                  >
                    <box-icon type="solid" name="map-alt" />
                    <span className="links_name">
                      Planes académicos
                    </span>
                  </NavLink>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  overlayClassName="nav-tooltip"
                  placement="right"
                  title="Unidades de aprendizaje"
                >
                  <NavLink
                    to="/unidades-aprendizaje"
                    activeClassName="active"
                  >
                    <box-icon type="solid" name="book-alt" />
                    <span className="links_name">
                      Unidades de aprendizaje
                    </span>
                  </NavLink>
                </Tooltip>
              </li>

              <li>
                <Tooltip
                  overlayClassName="nav-tooltip"
                  placement="right"
                  title="Actividades"
                >
                  <NavLink to="/actividades" activeClassName="active">
                    <box-icon type="solid" name="notepad" />
                    <span className="links_name">Actividades</span>
                  </NavLink>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  overlayClassName="nav-tooltip"
                  placement="right"
                  title="Estrategias"
                >
                  <NavLink to="/estrategias" activeClassName="active">
                    <box-icon type="solid" name="network-chart" />
                    <span className="links_name">Estrategias</span>
                  </NavLink>
                </Tooltip>
              </li>

              <li>
                <Tooltip
                  overlayClassName="nav-tooltip"
                  placement="right"
                  title="Métodos"
                >
                  <NavLink to="/metodos" activeClassName="active">
                    <box-icon type="solid" name="book-reader" />
                    <span className="links_name">Métodos</span>
                  </NavLink>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  overlayClassName="nav-tooltip"
                  placement="right"
                  title="Biliografías"
                >
                  <NavLink
                    to="/bibliografias"
                    activeClassName="active"
                  >
                    <box-icon type="solid" name="book" />
                    <span className="links_name">Bibliografías</span>
                  </NavLink>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  overlayClassName="nav-tooltip"
                  placement="right"
                  title="Verbos"
                >
                  <NavLink to="/verbos" activeClassName="active">
                    <box-icon name="message-square-dots" />
                    <span className="links_name">Verbos</span>
                  </NavLink>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  overlayClassName="nav-tooltip"
                  title="Conectores"
                  placement="right"
                >
                  <NavLink to="/conectores" activeClassName="active">
                    <box-icon name="transfer-alt" />
                    <span className="links_name">Conectores</span>
                  </NavLink>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  overlayClassName="nav-tooltip"
                  placement="right"
                  title="Perfil docente"
                >
                  <NavLink to="/docente" activeClassName="active">
                    <box-icon type="solid" name="graduation" />
                    <span className="links_name">Docente</span>
                  </NavLink>
                </Tooltip>
                <span className="tooltip">Docente</span>
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
