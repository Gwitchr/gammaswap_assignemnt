import { useState, useRef, PropsWithChildren, ReactNode } from "react";
import { useFloating, arrow } from "@floating-ui/react-dom-interactions";
import { Button, IButtonProps } from "components/atoms";

export interface IDropdownProps extends IButtonProps {
  buttonContent: ReactNode;
  closeOnClick?: boolean;
  dropdownId?: string;
  menuBackgroundColor?: string;
}

export function Dropdown({
  buttonContent,
  children,
  closeOnClick,
  menuBackgroundColor = "bg-gray-700",
  dropdownId = "",
  ...attributes
}: IDropdownProps) {
  const arrowRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { x, y, reference, floating, strategy, middlewareData, placement } =
    useFloating({
      open,
      onOpenChange: setOpen,
      middleware: [arrow({ element: arrowRef })],
    });

  const staticSide =
    {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[placement.split("-")[0]] || "";

  const handleMenuClick = () => {
    if (closeOnClick) {
      setOpen(!open);
    }
  };
  return (
    <div className="">
      <Button ref={reference} onClick={() => setOpen(!open)} {...attributes}>
        {buttonContent}
      </Button>
      {open ? (
        <div
          className={`my-1 min-w-max list-none divide-y divide-gray-100 rounded text-base shadow ${menuBackgroundColor}`}
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          id={`${dropdownId || ""}dropdown-menu`}
          onClick={handleMenuClick}
        >
          <div
            ref={arrowRef}
            className={`absolute h-2 w-2 rotate-45 ${menuBackgroundColor}`}
            style={{
              left: middlewareData?.arrow?.x ?? 0,
              [staticSide]: "-2px",
            }}
          />
          {children}
        </div>
      ) : null}
    </div>
  );
}
