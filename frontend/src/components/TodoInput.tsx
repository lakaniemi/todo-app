import { useState } from "react";

import { Button } from "./elements/Button";
import { TextInput } from "./elements/TextInput";
import CheckIcon from "../assets/icons/check.svg";
import CrossIcon from "../assets/icons/cross.svg";

type Props = {
  onSubmit: (value: string) => void;
  onCancel: () => void;
  initialValue?: string;
};

export const TodoInput: React.FC<Props> = ({
  onSubmit,
  onCancel,
  initialValue = "",
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <form
      className="flex gap-2 flex-wrap"
      onSubmit={() => {
        onSubmit(value);
      }}
      onReset={() => {
        onCancel();
      }}
    >
      <TextInput
        autoFocus
        label="TODO item description"
        className="flex-grow min-w-[16rem]"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div className="flex gap-1">
        <Button text="Add" variant="green" icon={CheckIcon} type="submit" />
        <Button text="Cancel" variant="red" icon={CrossIcon} type="reset" />
      </div>
    </form>
  );
};
