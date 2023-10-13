type Props = {
  text: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<Props> = (props) => {
  const { text } = props;

  return (
    <button
      className="bg-red-500 rounded-md px-4 py-1"
      type="button"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {text}
    </button>
  );
};
