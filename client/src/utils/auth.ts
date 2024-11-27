// use this to decode a token and get the user's information out of it
import { jwtDecode } from "jwt-decode";

const token_name = "e_shop_token";

interface UserToken {
  name: string;
  exp: number;
}

declare module "jwt-decode" {
  export interface JwtPayload {
    data: {
      _id: number;
      username: string;
      email: string;
    };
  }
}

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return jwtDecode(this.getToken() || "");
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }

      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem(token_name);
  }

  login(idToken: string) {
    // Saves user token to localStorage
    localStorage.setItem(token_name, idToken);
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem(token_name);
  }
}

export default new AuthService();
