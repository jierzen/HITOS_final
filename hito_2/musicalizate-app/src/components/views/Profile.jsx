import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import MyNavbar from '../utils/MyNavbar';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes implementar la lógica para cerrar sesión si es necesario
    console.log('Cerrar sesión'); // Ejemplo de mensaje en consola

    // Navegar a la página anterior
    navigate(-1);
  };

  return (
    <>
      <MyNavbar />
      <div className="container mt-5">
        <h1>Perfil de Usuario</h1>
        <nav className="nav flex-column">
          <Link to="/profile/events" className="nav-link">Mis Eventos</Link>
          <Link to="/profile/tickets" className="nav-link">Mis Tickets</Link>
          <Link to="/profile/favorites" className="nav-link">Mis Favoritos</Link>
          <Link to="/profile/cart" className="nav-link">Mi Carrito</Link>
        </nav>
        <button className="btn btn-outline-danger mt-3" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <Outlet /> {/* Este Outlet renderiza las rutas hijas */}
    </>
  );
};

export default Profile;