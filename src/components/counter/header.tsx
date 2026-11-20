"use client";

import { ArrowRightIcon, Redo2Icon, Undo2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLegend,
} from "../ui/field";
import { useCounter } from "./counter-provider";

export default function Header() {
  const { undo, redo, canRedo, canUndo, date } = useCounter();

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
          <Link
            href={"/result"}
            onClick={(e) => {
              if (!canUndo) {
                return e.preventDefault();
              }
            }}
          >
            <Button disabled={!canUndo}>
              Show Result <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </FieldContent>
    </>
  );
}
