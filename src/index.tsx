import { Component, h, render } from "preact";
import { GenerateAttestationService } from "./generate-attestation-service";
import { LeaveReason } from "./types";
import dateFormat from 'dateformat';
import { Form } from "./components/form";
import { leaveReasons } from "./config";

class App extends Component<any, any> {
  private generateService = new GenerateAttestationService();

  handleSelectReason(reason: LeaveReason){
    this.setState({
      selectedReason: reason
    })
  }

  handleGenerate() {
    const now  = new Date();
    this.generateService.generate({
      "firstname": "Honoré",
      "lastname": "Tomaka",
      "birthday": "26/02/1981",
      "placeofbirth": "Roubaix",
      "address": "44, Rue Gustave Scrive",
      "city": "La Madeleine",
      "zipcode": "59110",
      "date": dateFormat(now, "dd/mm/yyyy"),
      "heuresortie": dateFormat(now, "hh:MMTT"),
      "leaveReason": this.state.selectedReason
    });
  }

  render() {
    return <section class={"container"}>
      <header className="form-header">
        <h1 className="title">TropVite19</h1>
        <h2 className="sub-title">Indiquez une raison de sortie</h2>
      </header>
      <Form leaveReasons={leaveReasons} onSelect={this.handleSelectReason.bind(this)}/>
      <button className="button form-footer" onClick={() => this.handleGenerate()}>Generate Attestation</button>
    </section>;
  }

}

render(<App />, document.getElementById("root"));
