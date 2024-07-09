import React, { useState, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import MyNavbar from "../utils/MyNavbar";
import MyFooter from "../utils/MyFooter";
import { MarketplaceContext } from "../utils/MarketplaceProvider";

const Profile = () => {
  const { userSession, updateProfile } = useContext(MarketplaceContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: userSession.email,
    username: userSession.username,
    picture: userSession.picture,
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Cerrar sesión");
    navigate(-1);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <MyNavbar />
      <div className="container mt-5" style={{ flex: 1 }}>
        <h1>Perfil de Usuario</h1>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row mb-3 align-items-center">
              <div className="col-md-3 text-center">
                <img
                  src={userSession.picture}
                  alt="profile"
                  className="img-fluid rounded-circle"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
              </div>
              <div className="col-md-9">
                {isEditing ? (
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Picture URL</label>
                          <input
                            type="text"
                            className="form-control"
                            name="picture"
                            value={formData.picture}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3 d-grid">
                          <button
                            className="btn btn-primary"
                            onClick={handleSave}
                          >
                            Guardar
                          </button>
                        </div>
                        <div className="mb-3 d-grid">
                          <button
                            className="btn btn-secondary"
                            onClick={handleEdit}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p>
                      <strong>Username:</strong> {userSession.username}
                    </p>
                    <p>
                      <strong>Email:</strong> {userSession.email}
                    </p>
                    <p>
                      <strong>Picture:</strong>{" "}
                      <img
                        src={userSession.picture}
                        alt="profile"
                        className="img-fluid rounded-circle"
                        style={{
                          maxWidth: "150px",
                          maxHeight: "150px",
                          marginLeft: "30px",
                        }}
                      />
                    </p>
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleEdit}
                    >
                      Editar Perfil
                    </button>
                  </>
                )}
              </div>
            </div>
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
        <button className="btn btn-outline-danger mt-3" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <Outlet /> {/* Este Outlet renderiza las rutas hijas */}
      <MyFooter />
    </div>
  );
};

export default Profile;
