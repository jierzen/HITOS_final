export const URLBASE = 'http://localhost:3000';

export const ENDPOINT = {
  login: `${URLBASE}/api/profile/login`,
  users: `${URLBASE}/api/profile/registrarse`,
  perfil: `${URLBASE}/api/profile/perfil`,
  eventos: `${URLBASE}/api/events`, // Endpoint para eventos generales
  misEventos: `${URLBASE}/api/events/mis-eventos`, // Endpoint para eventos de usuario específico
};
