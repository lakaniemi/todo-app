type Props = {
  name: string;
  isCompleted: boolean;
  isEditing?: boolean;
};

export const Todo: React.FC<Props> = ({ name, isCompleted }) => {
  return (
    <li className="bg-slate-300 m-2 rounded-md flex gap-4">
      <div className="px-4 py-2 flex-grow">{name}</div>
      <div className="p-2">
        <input
          className="w-6 h-6 rounded-md focus:ring-green-700 focus:bg-green-700 checked:focus:bg-green-700 checked:bg-green-500 checked:hover:bg-green-700"
          type="checkbox"
          checked={isCompleted}
        />
      </div>
    </li>
  );
};
