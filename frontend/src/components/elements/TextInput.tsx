import classNames from "classnames";

type Props = {
  label: string;
  className?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const TextInput: React.FC<Props> = (props) => {
  const { label, className, ...rest } = props;

  return (
    <input
      type="text"
      aria-label={label}
      className={classNames(
        "bg-transparent border-0 border-b focus:border-b-2 focus:ring-0 border-cyan-800 p-1",
        className,
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
};
