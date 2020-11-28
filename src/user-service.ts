import { User } from "./types/user";

export class UserService {
  getUser(): User {
    return JSON.parse(localStorage.getItem("tv19User"));
  }

  saveUser(user: User) {
    localStorage.setItem("tv19User", JSON.stringify(user));
  }
}
