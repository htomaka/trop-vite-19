import { ComponentChildren, h } from "preact";
import { JSXInternal } from "preact/src/jsx";
import GenericEventHandler = JSXInternal.GenericEventHandler;

export const Radio = (props: { name: string, children: ComponentChildren, onChange: GenericEventHandler<HTMLInputElement>, value: any }) => {
  return <label className="radio">
    <input type="radio" name={props.name} onChange={props.onChange} />
    <span className="radio-label">{props.children}</span>
  </label>;
};
