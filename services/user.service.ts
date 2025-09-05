import api from "../lib/api";
import { User } from "../types/user";

class UserService {
  sendConfirmationCode(recipient: string, type: "email" | "phone") {
    return api.post("/users/register", { recipient, type });
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

  findAll(page: number, limit: number, search: string) {
    return api.get('/users', { params: { page, limit, search } });
  }
}

export default new UserService();
