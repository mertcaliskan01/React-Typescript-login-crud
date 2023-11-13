import http from "../http-common";

class AuthService {
  login(email: string, password: string) {
    return http
      .post("/auth/login", {
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
    return http.post("/auth/register", {
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
