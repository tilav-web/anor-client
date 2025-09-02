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
    return api.post("/auth/confirm", { recipient, code, user });
  }

  login(data: any) {
    return api.post("/auth/login", data);
  }

  getMe() {
    return api.get("/auth/me");
  }
}

export default new UserService();
