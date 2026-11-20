"use client";

import { EDCounterLabel } from "@/constants/count";
import { cn } from "cn";
import { useCallback, useMemo } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useCounter } from "./counter-provider";

interface EDCounterProps extends EDCounterLabel {}

export default function EDCounter(props: EDCounterProps) {
  const { counter, increment } = useCounter();

  const handleIncrement = useCallback(() => {
    increment(props.value);
  }, [increment]);

  const currentCount = useMemo(() => counter.ED[props.value], [counter.ED]);

  return (
    <div className={"relative inline-flex"}>
      <Button
        onClick={handleIncrement}
        className={cn(
          "w-full",
          !(
            props.value === "ABSCOND" ||
            props.value === "ICU" ||
            props.value === "DEATH"
          ) && "bg-sky-600/40!",
        )}
        variant={
          props.value === "ABSCOND" ||
          props.value === "ICU" ||
          props.value === "DEATH"
            ? "destructive"
            : "outline"
        }
      >
        {props.label}
      </Button>
      {currentCount > 0 && (
        <Badge
          className={cn(
            "absolute end-0 top-0 translate-x-1/3 -translate-y-1/3",
          )}
          variant={"secondary"}
        >
          {currentCount}
        </Badge>
      )}
    </div>
  );
}
