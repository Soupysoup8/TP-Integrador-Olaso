const fetchProfile = async () => {
    const token = localStorage.getItem('token'); // Recupera el token
  
    try {
      const response = await axios.get('http://localhost:3000/api/v1/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token aquí
        },
        withCredentials: true,
      });
  
      console.log(response.data); // Maneja la respuesta del perfil aquí
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
    }
  };
  
export default fetchProfile;