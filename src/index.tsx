import { Component, h, render } from "preact";
import { GenerateAttestationService } from "./generateAttestation/generate-attestation-service";
import { LeaveReason } from "./types";
import dateFormat from "dateformat";
import { GenerateAttestation } from "./generateAttestation/generateAttestation";
import { leaveReasons } from "./config";
import { User } from "./registerUser/user";
import { UserService } from "./user-service";
import { RegisterUser } from "./registerUser/registerUser";
import { AppState, AttestationFormData } from "./types/types";


class App extends Component<any, any> {
  private generateService = new GenerateAttestationService();
  private userService = new UserService();

  state: AppState = {
    user: this.userService.getUser(),
    attestationLoading: false
  };

  handleRegisterUser(user: User) {
    this.setState({ user });
    this.userService.saveUser(user);
  }

  handleGenerate(reason: LeaveReason) {
    const now = new Date();
    this.setLoading(true);
    this.generateService.generate(this.serializeForm(reason, now))
      .then(() => this.setLoading(false))
      .catch(() => this.setLoading(false));
  }

  setLoading(isLoading: boolean) {
    this.setState({
      attestationLoading: isLoading
    });
  }

  render() {
    return <section class="container">
      <header className="form-header">
        <h1 className="title">TropVite19</h1>
      </header>
      {this.state.user ? (
        <GenerateAttestation leaveReasons={leaveReasons} onSubmit={this.handleGenerate.bind(this)} loading={this.state.attestationLoading} />
      ) : <RegisterUser onSubmit={this.handleRegisterUser.bind(this)} />}

    </section>
      ;
  }

  private serializeForm(reason: LeaveReason, date: Date): AttestationFormData {
    return {
      ...this.state.user,
      date: dateFormat(date, "dd/mm/yyyy"),
      heuresortie: dateFormat(date, "hh:MMTT"),
      leavereason: reason
    };
  }
}

render(<App />, document.getElementById("root"));
