import { Component, h, render } from "preact";
import { GenerateAttestationService } from "./generate-attestation-service";
import { LeaveReason } from "./types";
import dateFormat from "dateformat";
import { GenerateAttestation } from "./components/generateAttestation";
import { leaveReasons } from "./config";
import { User } from "./types/user";
import { UserService } from "./user-service";
import { RegisterUser } from "./components/registerUser";

interface AppState {
  user: User
}

interface FormData extends User{
  date: string,
  heuresortie: string,
  leavereason: LeaveReason
}

class App extends Component<any, any> {
  private generateService = new GenerateAttestationService();
  private userService = new UserService();

  state: AppState = {
    user: this.userService.getUser()
  };

  handleRegisterUser(user: User) {
    this.setState({ user });
    this.userService.saveUser(user);
  }

  handleGenerate(reason: LeaveReason) {
    const now = new Date();
    this.generateService.generate(this.serializeForm(reason, now));
  }

  render() {
    return <section class="container">
      <header className="form-header">
        <h1 className="title">TropVite19</h1>
      </header>
      {this.state.user ? (
        <GenerateAttestation leaveReasons={leaveReasons} onSubmit={this.handleGenerate.bind(this)} />
      ) : <RegisterUser onSubmit={this.handleRegisterUser.bind(this)} />}

    </section>;
  }

  private serializeForm(reason: LeaveReason, date: Date): FormData {
    return {
      ...this.state.user,
      date: dateFormat(date, "dd/mm/yyyy"),
      heuresortie: dateFormat(date, "hh:MMTT"),
      leavereason: reason
    }
  }
}

render(<App />, document.getElementById("root"));
