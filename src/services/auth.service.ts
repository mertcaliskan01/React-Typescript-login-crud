import axios from "axios";

const API_URL = "http://www.developermert.site/nestapi/auth/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(first_name: string, last_name: string, email: string, password: string) {
    return axios.post(API_URL + "register", {
      first_name,
      last_name,
      email,
      password
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
