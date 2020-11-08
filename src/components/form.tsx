import { LeaveReason } from "../types";
import { h } from "preact";
import { JSXInternal } from "preact/src/jsx";
import GenericEventHandler = JSXInternal.GenericEventHandler;
import { Radio } from "./radio";
import { leaveReasonLabels } from "../config";

export const Form = ({ leaveReasons, onSelect }: { leaveReasons: LeaveReason[], onSelect: GenericEventHandler<HTMLInputElement> }) => {
  return <form>
    {leaveReasons.map((value, index) => {
      return <div className="form-group">
        <label className="radio">
          <Radio value={value} onChange={(event) => onSelect(event.currentTarget.value)} name="leavereason">{leaveReasonLabels[value]}</Radio>
        </label>
      </div>;
    })}
  </form>;
};
