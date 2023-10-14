import { useEffect, useId, useRef, useState } from "react";

import EllipsisIcon from "../../assets/icons/ellipsis-vertical.svg";

export type ContextMenuItem = {
  title: string;
  icon?: string;
  onClick: () => void;
};

type Props = {
  description: string;
  items: ContextMenuItem[];
  // Matches tailwind classes. E.g. iconSize 8 will lead to classes w-8 h-8
  iconSize?: number;
  // Which side the menu opens on
  menuDirection?: "left" | "right";
};

export const ContextMenu: React.FC<Props> = ({
  description,
  items,
  iconSize = 6,
  menuDirection = "left",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  const containerRef = useRef<HTMLDivElement>(null);
  // Check if user clicks outside of the menu and close the menu if that happens
  useEffect(() => {
    const handleClick = (event: TouchEvent | MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      if (!containerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("touchstart", handleClick);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("touchstart", handleClick);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [containerRef]);

  const menuDirectionStyle =
    menuDirection === "left" ? "right-1/2" : "left-1/2";

  return (
    <div ref={containerRef} className={`w-${iconSize} h-${iconSize} relative`}>
      <button
        id={`menubutton-${menuId}`}
        aria-haspopup="true"
        aria-controls={`menu-${menuId}`}
        aria-label={`Open context menu "${description}"`}
        className="w-full h-full flex justify-center"
        type="button"
        onClick={() => {
          setIsMenuOpen((prevState) => !prevState);
        }}
      >
        <img src={EllipsisIcon} className="h-full" alt="" />
      </button>
      {isMenuOpen && (
        <ul
          role="menu"
          id={`menu-${menuId}`}
          aria-labelledby={`menubutton-${menuId}`}
          className={`absolute z-10 w-max bg-gray-400 shadow-xl top-full flex flex-col ${menuDirectionStyle}`}
        >
          {items.map((item) => (
            <li role="presentation">
              <button
                role="menuitem"
                type="button"
                className="p-2 w-full flex gap-2 items-center hover:bg-gray-500"
                onClick={() => {
                  item.onClick();
                  setIsMenuOpen(false);
                }}
              >
                {item.icon && (
                  <img src={item.icon} className="w-4 h-4" alt="" />
                )}
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
