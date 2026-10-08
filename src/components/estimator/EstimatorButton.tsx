"use client";

import React from "react";
import { Button, ButtonProps } from "@/components/ui/Button";
import { useLayoutModal } from "@/lib/modal-context";

interface EstimatorButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
  children?: React.ReactNode;
}

export function EstimatorButton({
  children = "Estimate my project",
  variant = "primary",
  size = "md",
  withArrow = true,
  className = "",
  ...props
}: EstimatorButtonProps) {
  const { openEstimator } = useLayoutModal();

  return (
    <Button
      variant={variant}
      size={size}
      withArrow={withArrow}
      className={className}
      onClick={() => openEstimator()}
      {...props}
    >
      {children}
    </Button>
  );
}
