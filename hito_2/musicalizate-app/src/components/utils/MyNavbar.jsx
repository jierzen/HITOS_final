import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/events">Catalogo de Eventos</Link>
      <Link to="/login">Iniciar Sesion</Link>
      <Link to="/signup">Registrarme</Link>
      <Link to="/about">Acerca de</Link>
      <Link to="/contact">Contacto</Link>
      {/* Más enlaces según sea necesario */}
    </nav>
  );
}

export default Navbar