import { LeaveReason } from "../types";
import { h } from "preact";
import { JSXInternal } from "preact/src/jsx";
import { Radio } from "./radio";
import { leaveReasonLabels } from "../config";
import GenericEventHandler = JSXInternal.GenericEventHandler;

export const Form = ({ leaveReasons, onSelect }: { leaveReasons: LeaveReason[], onSelect: GenericEventHandler<HTMLInputElement> }) => {
  return <form className="radio-group radio-group--stacked">
    {leaveReasons.map((value, index) => {
      return <Radio value={value} onChange={(event) => onSelect(event.currentTarget.value)}
                    name="leavereason">{leaveReasonLabels[value]}</Radio>;
    })}
  </form>;
};
