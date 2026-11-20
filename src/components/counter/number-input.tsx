"use client";

import { Counter } from "@/constants/count";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";
import { useCounter } from "./counter-provider";

export default function NumberInput(props: {
  label: string;
  value: keyof Counter;
}) {
  const { counter, setNumber } = useCounter();

  return (
    <InputGroup>
      <InputGroupInput
        min={0}
        step={1}
        onChange={(e) => {
          setNumber(props.value, Number(e.target.value));
        }}
        type={"number"}
        className="text-center"
        value={counter[props.value].toString()}
      />
      <InputGroupAddon
        className="bg-secondary h-7.5 min-w-30 rounded-md pe-2"
        align={"inline-start"}
      >
        <InputGroupText>{props.label}</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
