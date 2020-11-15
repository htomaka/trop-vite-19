import { User } from "./types/user";

export class UserService {
  getUser(): User {
    return JSON.parse(sessionStorage.getItem("tv19User"));
  }

  saveUser(user: User) {
    sessionStorage.setItem("tv19User", JSON.stringify(user));
  }
}
