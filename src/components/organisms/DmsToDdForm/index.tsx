import { useState } from "react";
import { dmsToDd } from "@/utils/dmsToDd.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { SymbolPlaceholder } from "@/components/atoms/SymbolPlaceholder";
import { InputForm } from "@/components/molecules/InputForm";

export function DmsToDdForm() {
  const [latDMS, setLatDMS] = useState({
    degrees: "",
    minutes: "",
    seconds: "",
    direction: "N",
  });
  const [longDMS, setLongDMS] = useState({
    degrees: "",
    minutes: "",
    seconds: "",
    direction: "E",
  });
  const [latDD, setLatDD] = useState<number | null>(null);
  const [longDD, setLongDD] = useState<number | null>(null);

  const handleConvert = () => {
    const lat = dmsToDd(
      parseFloat(latDMS.degrees),
      parseFloat(latDMS.minutes),
      parseFloat(latDMS.seconds),
      latDMS.direction,
    );
    const long = dmsToDd(
      parseFloat(longDMS.degrees),
      parseFloat(longDMS.minutes),
      parseFloat(longDMS.seconds),
      longDMS.direction,
    );
    setLatDD(lat);
    setLongDD(long);
  };

  return (
    <InputForm
      title={`DMS to DD`}
      description={`Convert Coordinate Degrees Minutes Seconds (DMS) to Decimal Degrees (DD)`}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="latDegrees" className="text-right">
            Latitude
          </Label>
          <div className="flex flex-row gap-4 col-span-3">
            <div className="relative col-span-3">
              <Input
                id="latDegrees"
                type={"number"}
                value={latDMS.degrees}
                onChange={(e) =>
                  setLatDMS({ ...latDMS, degrees: e.target.value })
                }
                placeholder="°"
                className="pr-6"
              />
              {latDMS.degrees && <SymbolPlaceholder symbol={`°`} />}
            </div>
            <div className="relative col-span-3">
              <Input
                id="latMinutes"
                type={"number"}
                value={latDMS.minutes}
                onChange={(e) =>
                  setLatDMS({ ...latDMS, minutes: e.target.value })
                }
                placeholder="'"
                className="pr-6"
              />
              {latDMS.minutes && <SymbolPlaceholder symbol={`'`} />}
            </div>
            <div className="relative col-span-3">
              <Input
                id="latSeconds"
                type={"number"}
                value={latDMS.seconds}
                onChange={(e) =>
                  setLatDMS({ ...latDMS, seconds: e.target.value })
                }
                placeholder={`"`}
                className="pr-6"
              />
              {latDMS.seconds && <SymbolPlaceholder symbol={`"`} />}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="longDegrees" className="text-right">
            Longitude
          </Label>
          <div className="flex flex-row gap-4 col-span-3">
            <div className="relative flex-1">
              <Input
                id="longDegrees"
                type={"number"}
                value={longDMS.degrees}
                onChange={(e) =>
                  setLongDMS({
                    ...longDMS,
                    degrees: e.target.value,
                  })
                }
                placeholder="°"
                className="pr-6"
              />
              {longDMS.degrees && (
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  °
                </span>
              )}
            </div>
            <div className="relative flex-1">
              <Input
                id="longMinutes"
                type={"number"}
                value={longDMS.minutes}
                onChange={(e) =>
                  setLongDMS({
                    ...longDMS,
                    minutes: e.target.value,
                  })
                }
                placeholder="'"
                className="pr-6"
              />
              {longDMS.minutes && (
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  '
                </span>
              )}
            </div>
            <div className="relative flex-1">
              <Input
                id="longSeconds"
                type={"number"}
                value={longDMS.seconds}
                onChange={(e) =>
                  setLongDMS({
                    ...longDMS,
                    seconds: e.target.value,
                  })
                }
                placeholder={`"`}
                className="pr-6"
              />
              {longDMS.seconds && (
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  "
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="button" onClick={handleConvert}>
            Convert
          </Button>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="latValue" className="text-right">
            Latitude
          </Label>
          <div className="col-span-3 relative">
            <Input
              id="latValue"
              value={latDD !== null ? `${latDD} deg` : ""}
              className="cursor-default pr-10"
              disabled={true}
              placeholder={`deg`}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="longValue" className="text-right">
            Longitude
          </Label>
          <div className="col-span-3 relative">
            <Input
              id="longValue"
              value={longDD !== null ? `${longDD} deg` : ""}
              className="cursor-default pr-10"
              disabled={true}
              placeholder={`deg`}
            />
          </div>
        </div>
      </div>
      <div className={`w-full`}>
        <Button type="submit" className={`w-full`}>
          Add to Maps
        </Button>
      </div>
    </InputForm>
  );
}
