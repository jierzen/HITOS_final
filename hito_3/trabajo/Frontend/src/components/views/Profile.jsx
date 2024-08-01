import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyNavbar from "../utils/MyNavbar";
import MyFooter from "../utils/MyFooter";
import { MarketplaceContext } from "../utils/MarketplaceProvider";
import axios from "axios";
import { ENDPOINT } from "../../config/constans";
import BackButton from "./backButton"; 

const Profile = () => {
  const { userSession, updateProfile, logOut } = useContext(MarketplaceContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: userSession?.email || "",
    username: userSession?.username || "",
    profile_picture: userSession?.profile_picture || "",
  });
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userSession.isLoggedIn) {
      navigate("/login");
    }
  }, [userSession.isLoggedIn, navigate]);

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

  const handleSave = async (e) => {
    e.preventDefault();
  
    if (!userSession.user_id) {
      console.error("user_id is not defined");
      window.alert("No se pudo encontrar el ID del usuario.");
      return;
    }
  
    try {
      const updatedData = { ...formData };
      if (password) {
        updatedData.password = password;
      }
  
      const response = await axios.put(
        `${ENDPOINT.perfil}/update/${userSession.user_id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Usuario modificado:", response.data);
  
      updateProfile(response.data);
      setIsEditing(false);
      window.alert("Usuario actualizado con éxito 😀.");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      window.alert("Hubo un problema al actualizar el perfil 🙁.");
    }
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
                  src={formData.profile_picture}
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
                        <form onSubmit={handleSave}>
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
                              required
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
                              required
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="password">Contraseña</label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="Mínimo 8 caracteres"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="profile_picture">Foto de Perfil</label>
                            <input
                              type="text"
                              className="form-control"
                              id="profile_picture"
                              name="profile_picture"
                              placeholder="Ingrese URL de la foto de perfil"
                              value={formData.profile_picture}
                              onChange={handleChange}
                            />
                          </div>
                          <button type="submit" className="btn btn-primary mt-3">
                            Guardar
                          </button>
                          <BackButton />
                        </form>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3>{userSession.username}</h3>
                    <p>{userSession.email}</p>
                    <button className="btn btn-secondary" onClick={handleEdit}>
                      Editar Perfil
                    </button>
                    <button className="btn btn-danger ms-3" onClick={logOut}>
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
            <nav className="nav flex-column">
              <Link to="/events" className="nav-link">Mis Eventos</Link>
              <Link to="/profile/tickets" className="nav-link">Mis Tickets</Link>
              <Link to="/profile/favorites" className="nav-link">Mis Favoritos</Link>
              <Link to="/cart" className="nav-link">Mi Carrito</Link>
            </nav>
          </div>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};

export default Profile;
