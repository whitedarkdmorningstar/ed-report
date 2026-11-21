"use client";

import { ArrowRightIcon, Redo2Icon, Undo2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Button } from "../ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLegend,
} from "../ui/field";
import { toast } from "../ui/toast";
import { useCounter } from "./counter-provider";

export default function Header() {
  const { undo, redo, canRedo, canUndo, date, counter } = useCounter();
  const router = useRouter();

  const handleShowResult = useCallback(() => {
    const { I, II, III } = counter.total.ED;
    const edIn = I + II + III;
    const edOut = Object.values(counter.ED).reduce((sum, val) => sum + val, 0);

    // Warn the user
    if (edIn !== edOut) {
      return toast.add({
        title: "Error!",
        description: "ED In and Out are not the same.",
        type: "error",
      });
    }

    router.push("/result");
  }, [counter]);

  return (
    <>
      <FieldLegend>ED Report</FieldLegend>
      <FieldDescription>{date?.toDateString()}</FieldDescription>
      <FieldContent>
        <div className={"flex flex-row items-center justify-between gap-4"}>
          <Field orientation={"horizontal"}>
            <Button disabled={!canUndo} onClick={undo} variant={"outline"}>
              <Undo2Icon /> Undo
            </Button>
            <Button disabled={!canRedo} onClick={redo} variant={"outline"}>
              <Redo2Icon /> Redo
            </Button>
          </Field>
          <Button disabled={!canUndo} onClick={handleShowResult}>
            Show Result <ArrowRightIcon />
          </Button>
        </div>
      </FieldContent>
    </>
  );
}
