import { Component, h, render } from "preact";
import { GenerateAttestationService } from "./generate-attestation-service";
import { LeaveReason } from "./types";
import { JSXInternal } from "preact/src/jsx";
import dateFormat from 'dateformat';
import GenericEventHandler = JSXInternal.GenericEventHandler;


const Form = (props: {leaveReasons: LeaveReason[], onSelect: GenericEventHandler<HTMLInputElement>}) => {
  return <form>
    {props.leaveReasons.map((value, index) => {
      return <div className="form-group">
        <label>
          <input type="radio" value={value} onChange={(event) => props.onSelect(event.currentTarget.value)} name="leavereason"/>
          {value}
        </label>
      </div>;
    })}
  </form>;
};

class App extends Component<any, any> {
  private generateService = new GenerateAttestationService();
  private leaveReasons: LeaveReason[] = [
    "enfants",
    "travail",
    "achats",
    "sante",
    "famille",
    "handicap",
    "sportAnimaux",
    "convocation",
    "mission"
  ];

  handleSelectReason(reason: LeaveReason){
    console.log(reason);
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
    return <div>
      <Form leaveReasons={this.leaveReasons} onSelect={this.handleSelectReason.bind(this)}/>
      <button onClick={() => this.handleGenerate()}>Generate Attestation</button>
    </div>;
  }

}

render(<App />, document.getElementById("root"));
