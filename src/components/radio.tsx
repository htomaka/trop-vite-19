import { ComponentChildren, h } from "preact";
import { JSXInternal } from "preact/src/jsx";
import GenericEventHandler = JSXInternal.GenericEventHandler;

export const Radio = (props: { name: string, children: ComponentChildren, onChange: GenericEventHandler<HTMLInputElement>, value: any }) => {
  return <label className="radio">
  <span className="radio__input">
    <input type="radio" name={props.name} onChange={props.onChange} />
    <span className="radio__control"></span>
    </span>
    <span className="radio__label">{props.children}</span>
  </label>;
};
