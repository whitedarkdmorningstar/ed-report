"use client";

import { TotalCounterLabel } from "@/constants/count";
import { cn } from "cn";
import { InfoIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTrigger,
} from "../ui/popover";
import { useCounter } from "./counter-provider";

interface TotalCounterProps extends TotalCounterLabel {}

export default function TotalCounter(props: TotalCounterProps) {
  const { increment, counter } = useCounter();

  const increaseCatI = useCallback(
    () => increment(props.value, "I"),
    [increment],
  );

  const increaseCatII = useCallback(
    () => increment(props.value, "II"),
    [increment],
  );

  const increaseCatIII = useCallback(
    () => increment(props.value, "III"),
    [increment],
  );

  const currentCount = useMemo(
    () => counter.total[props.value],
    [props.value, counter.total],
  );

  return (
    <div className="flex flex-row items-center gap-4">
      <div className={"min-w-16"}>
        <span className={"font-bold"}>{props.label}</span>
        {!!props.description && (
          <Popover>
            <PopoverTrigger
              render={<Button variant={"ghost"} size={"icon-xs"} />}
            >
              <InfoIcon />
            </PopoverTrigger>
            <PopoverContent align={"start"}>
              <PopoverDescription>{props.description}</PopoverDescription>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <ButtonBadge label={"I"} onClick={increaseCatI} count={currentCount.I} />
      <ButtonBadge
        label={"II"}
        onClick={increaseCatII}
        count={currentCount.II}
      />
      <ButtonBadge
        label={"III"}
        onClick={increaseCatIII}
        count={currentCount.III}
      />
    </div>
  );
}

export function ButtonBadge(props: {
  count: number;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className={"relative inline-flex flex-1"}>
      <Button
        variant={"outline"}
        className={cn(
          "w-full",
          props.label === "I"
            ? "bg-red-600! dark:bg-red-800!"
            : props.label === "II"
              ? "bg-yellow-500! dark:bg-yellow-600!"
              : "bg-green-600 dark:bg-green-800!",
        )}
        size={"icon"}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.label}
      </Button>
      {props.count > 0 && (
        <Badge
          className={cn(
            "absolute end-0 top-0 translate-x-1/3 -translate-y-1/3",
          )}
          variant={"secondary"}
        >
          {props.count}
        </Badge>
      )}
    </div>
  );
}

export function TotalCategories() {
  const {
    counter: { total },
  } = useCounter();

  const categories = useMemo(() => {
    let catI = 0;
    let catII = 0;
    let catIII = 0;

    for (const [key, value] of Object.entries(total)) {
      const { I, II, III } = value;
      catI += I;
      catII += II;
      catIII += III;
    }
    return { catI, catII, catIII };
  }, [total]);

  return (
    <div className="flex flex-row items-center gap-4">
      <div className="min-w-16">Category</div>
      <ButtonBadge label="I" count={categories.catI} />
      <ButtonBadge label="II" count={categories.catII} />
      <ButtonBadge label="III" count={categories.catIII} />
    </div>
  );
}
