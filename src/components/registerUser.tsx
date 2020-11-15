import { Component, h } from "preact";
import { User } from "../types/user";

export class RegisterUser extends Component<any, any> {
  state: User = {
    address: "", birthday: "", city: "", firstname: "", lastname: "", placeofbirth: "", zipcode: ""

  };

  handleSubmit() {
    this.props.onSubmit(this.state);
  }

  handleFirstName(event: any) {
    this.setState({ firstname: event.target.value });
  }

  handleLastName(event: any) {
    this.setState({ lastname: event.target.value });
  }

  handleBirthday(event: any) {
    this.setState({ birthday: event.target.value });
  }

  handlePlaceofbirth(event: any) {
    this.setState({ placeofbirth: event.target.value });
  }

  handleAddress(event: any) {
    this.setState({ address: event.target.value });
  }

  handleZipcode(event: any) {
    this.setState({ zipcode: event.target.value });
  }

  handleCity(event: any) {
    this.setState({ city: event.target.value });
  }

  render() {
    return <form>
      <h2 className="sub-title">Entrez vos infos personnelles</h2>
      <div className="field">
        <label htmlFor="firstname">Prénom</label>
        <input type="text" id="firstname" onInput={this.handleFirstName.bind(this)} required={true} />
      </div>
      <div className="field">
        <label htmlFor="lastname">Nom</label>
        <input type="text" id="lastname" onInput={this.handleLastName.bind(this)} required={true} />
      </div>
      <div className="field">
        <label htmlFor="birthday">Date de naissance</label>
        <input type="text" id="birthday" onInput={this.handleBirthday.bind(this)} required={true} />
      </div>
      <div className="field">
        <label htmlFor="placeofbirth">Lieu de naissance</label>
        <input type="text" id="placeofbirth" onInput={this.handlePlaceofbirth.bind(this)} required={true} />
      </div>
      <div className="field">
        <label htmlFor="address">Adresse</label>
        <input type="text" id="address" onInput={this.handleAddress.bind(this)} required={true} />
      </div>
      <div className="field">
        <label htmlFor="zipcode">Code postal</label>
        <input type="text" id="zipcode" onInput={this.handleZipcode.bind(this)} required={true} />
      </div>
      <div className="field">
        <label htmlFor="city">Ville</label>
        <input type="text" id="city" onInput={this.handleCity.bind(this)} required={true} />
      </div>

      <button className="button form-footer" onClick={() => this.handleSubmit()}>Enregistrer</button>
    </form>;
  }
}
