import {
  ED_COUNTER_LABELS,
  TOTAL_COUNTER_LABELS,
} from "@/constants/count.label";
import { Card, CardContent } from "../ui/card";
import { FieldGroup, FieldSet } from "../ui/field";
import { Separator } from "../ui/separator";
import EDCounter from "./ed-counter";
import Header from "./header";
import NumberInput from "./number-input";
import TotalCounter, { TotalCategories } from "./total-counter";

export default function Counter() {
  return (
    <FieldSet className="w-full max-w-2xl">
      <Header />
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardContent>
              <div className={"flex flex-col gap-4"}>
                {TOTAL_COUNTER_LABELS.map((e) => (
                  <TotalCounter {...e} key={e.value} />
                ))}
                <Separator />
                <TotalCategories />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <TotalCounter value={"ED"} label={"ED"} />
              <Separator className={"my-4"} />
              <div className="grid grid-cols-3 gap-4">
                {ED_COUNTER_LABELS.map((e) => (
                  <EDCounter {...e} key={e.value} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardContent>
            <FieldGroup className="grid grid-cols-1 lg:grid-cols-2">
              <NumberInput label={"Dog Bite"} value={"DOG_BITE"} />
              <NumberInput label={"Please Admit"} value={"ADMIT"} />
              <NumberInput label={"Brought Death"} value={"BD"} />
            </FieldGroup>
          </CardContent>
        </Card>
      </FieldGroup>
    </FieldSet>
  );
}
