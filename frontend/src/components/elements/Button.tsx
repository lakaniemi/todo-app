const variants = {
  naked: "hover:bg-gray-200",
  default: "bg-blue-400 hover:bg-blue-300",
  red: "bg-red-400 hover:bg-red-300",
  green: "bg-green-400 hover:bg-green-300",
} as const;

type Props = {
  text: string;
  // If button is icon-only, text will act as alt text
  iconOnly?: boolean;
  variant?: keyof typeof variants;
  icon?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<Props> = (props) => {
  const { text, icon, iconOnly, variant = "default" } = props;

  return (
    <button
      className={`${variants[variant]} rounded-md ${
        iconOnly ? "p-1" : "px-2 py-1"
      }`}
      type="button"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <img src={icon} className="w-4 h-4" alt={iconOnly ? text : ""} />
        )}
        {!iconOnly && <div>{text}</div>}
      </div>
    </button>
  );
};
