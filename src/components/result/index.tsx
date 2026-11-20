"use client";

import {
  ED_COUNTER_LABELS,
  TOTAL_COUNTER_LABELS,
} from "@/constants/count.label";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useCounter } from "../counter/counter-provider";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldSet,
  FieldTitle,
} from "../ui/field";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Download from "./download";

export default function Result() {
  const { counter, date } = useCounter();

  const cat = useMemo(() => {
    let I = 0;
    let II = 0;
    let III = 0;

    for (const [key, value] of Object.entries(counter.total)) {
      I += value.I;
      II += value.II;
      III += value.III;
    }
    return { I, II, III, total: I + II + III };
  }, [counter.total]);

  return (
    <FieldSet className={"relative w-full max-w-2xl"}>
      <FieldTitle>ED Report</FieldTitle>
      <FieldDescription>{date?.toDateString()}</FieldDescription>
      <FieldContent>
        <Field
          data-ignore-capture={"true"}
          orientation={"horizontal"}
          className="no-capture mb-4 justify-between"
        >
          <Link href={"/"}>
            <Button variant={"outline"}>
              <ArrowLeftIcon /> Back
            </Button>
          </Link>
          <Download />
        </Field>
        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className={"flex flex-col gap-4 md:col-span-2"}>
            <Card>
              <CardContent>
                <Table>
                  <TableCaption>Total Patients</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead className={"text-right"}>Cat I</TableHead>
                      <TableHead className={"text-right"}>Cat II</TableHead>
                      <TableHead className={"text-right"}>Cat III</TableHead>
                      <TableHead className={"text-right"}>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TOTAL_COUNTER_LABELS.map((e) => {
                      const { I, II, III } = counter.total[e.value];

                      return (
                        <TableRow key={e.value}>
                          <TableCell>{e.label}</TableCell>
                          <TableCell className="text-right">{I}</TableCell>
                          <TableCell className="text-right">{II}</TableCell>
                          <TableCell className="text-right">{III}</TableCell>
                          <TableCell className="text-right">
                            {I + II + III}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableHead>Total</TableHead>
                      <TableHead className={"text-right"}>{cat.I}</TableHead>
                      <TableHead className={"text-right"}>{cat.II}</TableHead>
                      <TableHead className={"text-right"}>{cat.III}</TableHead>
                      <TableHead className={"text-right"}>
                        {cat.total}
                      </TableHead>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Table>
                  <TableCaption>ED Patients</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead className={"text-right"}>Cat I</TableHead>
                      <TableHead className={"text-right"}>Cat II</TableHead>
                      <TableHead className={"text-right"}>Cat III</TableHead>
                      <TableHead className={"text-right"}>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{"ED"}</TableCell>
                      <TableCell className="text-right">
                        {counter.total.ED.I}
                      </TableCell>
                      <TableCell className="text-right">
                        {counter.total.ED.II}
                      </TableCell>
                      <TableCell className="text-right">
                        {counter.total.ED.III}
                      </TableCell>
                      <TableCell className="text-right">
                        {counter.total.ED.I +
                          counter.total.ED.II +
                          counter.total.ED.III}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="hidden md:block">
              <CardContent>
                <div className="flex w-full flex-row items-center gap-4">
                  <div className="flex flex-1">
                    <span className={"w-36"}>Dog Bite</span>
                    <span>{counter.DOG_BITE}</span>
                  </div>
                  <Separator orientation="vertical" className={"h-8"} />
                  <div className="flex flex-1">
                    <span className={"w-36"}>Please Admit</span>
                    <span>{counter.ADMIT}</span>
                  </div>
                </div>
                <div className="flex">
                  <span className={"w-36"}>Brought Death</span>
                  <span>{counter.BD}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardContent>
              <Table>
                <TableCaption>ED Patients</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Speciality</TableHead>
                    <TableHead className={"text-right"}>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ED_COUNTER_LABELS.map((e) => (
                    <TableRow key={e.value}>
                      <TableCell>{e.label}</TableCell>
                      <TableCell className="text-end">
                        {counter.ED[e.value]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="md:hidden">
            <CardContent>
              <div className="flex w-full flex-row items-center gap-4">
                <div className="flex flex-1">
                  <span className={"w-36"}>Dog Bite</span>
                  <span>{counter.DOG_BITE}</span>
                </div>
                <Separator orientation="vertical" className={"h-8"} />
                <div className="flex flex-1">
                  <span className={"w-36"}>Please Admit</span>
                  <span>{counter.ADMIT}</span>
                </div>
              </div>
              <div className="flex">
                <span className={"w-36"}>Brought Death</span>
                <span>{counter.BD}</span>
              </div>
            </CardContent>
          </Card>
        </FieldGroup>
      </FieldContent>
    </FieldSet>
  );
}
