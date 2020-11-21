import { LeaveReason } from "../types";
import { Component, h } from "preact";
import { Radio } from "../components/radio";
import { leaveReasonLabels } from "../config";


export class GenerateAttestation extends Component<any, any> {
  state: { reason: LeaveReason } = {
    reason: null
  };

  handleSelect(reason: LeaveReason) {
    this.setState({ reason });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.props.onSubmit(this.state.reason);
  }

  render(props: { leaveReasons: LeaveReason[], onSubmit: () => void, loading: boolean }) {
    return <form className="radio-group radio-group--stacked">
      <h2 className="sub-title">Indiquez une raison de sortie</h2>
      {props.leaveReasons.map((value) => {
        return <Radio value={value} name="leavereason"
                      onChange={() => this.handleSelect(value)}>{leaveReasonLabels[value]}</Radio>;
      })}
      <button className="button form-footer" disabled={props.loading}
              onClick={this.handleSubmit.bind(this)}> {props.loading ? "Attendez un instant..." : "Télécharger l'attestation"}</button>
    </form>;
  }
}

