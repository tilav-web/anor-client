import api from "../lib/api";
import { User } from "../types/user";

class UserService {
  async sendConfirmationCode(recipient: string, type: "email" | "phone") {
    const response = await api.post("/users/register", { recipient, type });
    return response.data;
  }

  async confirmRegistration(
    recipient: string,
    code: string,
    user: Omit<User, "balance" | "role">
  ) {
    const response = await api.post("/users/confirm", { recipient, code, user });
    return response.data;
  }

  async login(data: any) {
    const response = await api.post("/users/login", data);
    return response.data;
  }

  async getMe() {
    const response = await api.get("/users/me");
    return response.data;
  }

  async findAll(page: number, limit: number, search: string) {
    const response = await api.get('/users', { params: { page, limit, search } });
    return response.data;
  }

  async updateProfile(data: Partial<User>) {
    const response = await api.patch("/users/me", data);
    return response.data;
  }
}

export default new UserService();
