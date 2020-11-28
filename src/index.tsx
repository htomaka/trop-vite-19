import { Component, h, render } from "preact";
import { GenerateAttestationService } from "./generateAttestation/generate-attestation-service";
import { LeaveReason } from "./types";
import dateFormat from "dateformat";
import { GenerateAttestation } from "./generateAttestation/generateAttestation";
import { leaveReasons } from "./config";
import { User } from "./types/user";
import { UserService } from "./user-service";
import { RegisterUser } from "./registerUser/registerUser";
import { AppState, AttestationFormData } from "./types/types";
import { GeocodingService } from "./geocoding/geocoding-service";

class App extends Component<any, any> {
  private generateService = new GenerateAttestationService();
  private geocodingService = new GeocodingService();
  private userService = new UserService();

  state: AppState = {
    user: this.userService.getUser(),
    attestationLoading: false,
    pageTitle: ""
  };

  componentDidMount() {
    this.setState({ pageTitle: this.state.user ? "Indiquez une raison de sortie" : "Entrez vos informations personnelles" });
  }

  handleRegisterUser(user: User) {
    this.setState({ user });
    this.geocodingService.getLocation(user.address).then(location => {
      this.userService.saveUser({ ...user, address: { ...user.address, location } });
    });
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

  setPageTitle(title: string) {
    this.setState({ title });
  }

  render() {
    return <section class="container">
      <header className="form-header">
        <h1 className="title">TropVite19</h1>
        <h2 className="sub-title">{this.state.pageTitle}</h2>
      </header>
      {this.state.user ? (
        <GenerateAttestation leaveReasons={leaveReasons} onSubmit={this.handleGenerate.bind(this)}
                             loading={this.state.attestationLoading} />
      ) : <RegisterUser onSubmit={this.handleRegisterUser.bind(this)} />}

    </section>
      ;
  }

  private serializeForm(reason: LeaveReason, date: Date): AttestationFormData {
    return {
      birthday: this.state.user.birthday,
      firstname: this.state.user.firstname,
      lastname: this.state.user.lastname,
      placeofbirth: this.state.user.placeofbirth,
      address: this.state.user.address.street,
      city: this.state.user.address.city,
      zipcode: this.state.user.address.zipcode,
      date: dateFormat(date, "mm/dd/yyyy"),
      heuresortie: dateFormat(date, "hh:MMTT"),
      leavereason: reason
    };
  }
}

render(<App />, document.getElementById("root"));
