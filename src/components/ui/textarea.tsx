import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: "none" | "both" | "horizontal" | "vertical";
  maxHeight?: string; // Optional max height prop
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, resize = "vertical", maxHeight = "200px", ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(
          textarea.scrollHeight,
          parseInt(maxHeight),
        )}px`;

        // Apply scroll when the content exceeds maxHeight
        if (textarea.scrollHeight > parseInt(maxHeight)) {
          textarea.style.overflowY = "scroll";
        } else {
          textarea.style.overflowY = "hidden";
        }
      }
    }, [props.value, maxHeight]);

    return (
      <textarea
        className={cn(
          "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          resize === "both" && "resize-both",
          resize === "horizontal" && "resize-x",
          resize === "vertical" && "resize-y",
          className,
        )}
        style={{ maxHeight }}
        ref={(node) => {
          textareaRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (
              ref as React.MutableRefObject<HTMLTextAreaElement | null>
            ).current = node;
        }}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
