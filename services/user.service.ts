import api from "../lib/api";
import { User } from "../types/user";

class UserService {
  sendConfirmationCode(recipient: string, type: "email" | "phone") {
    return api.post("/auth/register", { recipient, type });
  }

  confirmRegistration(
    recipient: string,
    code: string,
    user: Omit<User, "balance" | "role">
  ) {
    return api.post("/users/confirm", { recipient, code, user });
  }

  login(data: any) {
    return api.post("/users/login", data);
  }

  getMe() {
    return api.get("/users/me");
  }
}

export default new UserService();
