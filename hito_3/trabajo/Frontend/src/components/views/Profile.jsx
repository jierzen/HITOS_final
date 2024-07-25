import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyNavbar from "../utils/MyNavbar";
import MyFooter from "../utils/MyFooter";
import { MarketplaceContext } from "../utils/MarketplaceProvider";

const Profile = () => {
  const { userSession, updateProfile } = useContext(MarketplaceContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: userSession?.email || "",
    username: userSession?.username || "",
    picture: userSession?.picture || "",
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <MyNavbar />
      
      <div className="container mt-5" style={{ flex: 1 }}>
        <h1>Perfil de Usuario</h1>
        
        <div className="card mb-4">
          <div className="card-body">
            <div className="row mb-3 align-items-center">
              <div className="col-md-3 text-center">
                
                <img
                  src={userSession?.picture || ""}
                  alt="profile"
                  className="img-fluid rounded-circle"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
              </div>
              <div className="col-md-9">
                {isEditing ? (
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-md-8">
                        <form>
                          <div className="form-group">
                            <label htmlFor="username">Nombre de Usuario</label>
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              name="username"
                              placeholder="Ingrese su nombre de usuario"
                              value={formData.username}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              placeholder="Ingrese su correo electrónico"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="picture">Foto de Perfil</label>
                            <input
                              type="text"
                              className="form-control"
                              id="picture"
                              name="picture"
                              placeholder="Ingrese URL de la foto de perfil"
                              value={formData.picture}
                              onChange={handleChange}
                            />
                          </div>
                          <button type="button" className="btn btn-primary mt-3" onClick={handleSave}>
                            Guardar
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3>{userSession?.username}</h3>
                    <p>{userSession?.email}</p>
                    <button className="btn btn-secondary" onClick={handleEdit}>Editar Perfil</button>
                    
                    <button className="btn btn-danger ms-3" onClick={handleLogout}>Cerrar Sesión</button>
                  </div>
                )}
              </div>
            </div>
            <nav className="nav flex-column">
          <Link to="/profile/events" className="nav-link">
            Mis Eventos
          </Link>
          <Link to="/profile/tickets" className="nav-link">
            Mis Tickets
          </Link>
          <Link to="/profile/favorites" className="nav-link">
            Mis Favoritos
          </Link>
          <Link to="/cart" className="nav-link">
            Mi Carrito
          </Link>
        </nav>
          </div>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};

export default Profile;
