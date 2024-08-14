import { useState } from "react";
import { ddToDms } from "@/utils/ddToDms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputForm } from "@/components/molecules/InputForm";

interface DdToDmsFormProps {
  onAddToMaps: (lat: number, long: number) => void;
}

export function DdToDmsForm({ onAddToMaps }: DdToDmsFormProps) {
  const [latDD, setLatDD] = useState("");
  const [longDD, setLongDD] = useState("");
  const [latDMS, setLatDMS] = useState({
    degrees: 0,
    minutes: 0,
    seconds: 0,
    direction: "N",
  });
  const [longDMS, setLongDMS] = useState({
    degrees: 0,
    minutes: 0,
    seconds: 0,
    direction: "E",
  });

  const handleConvert = () => {
    const lat = ddToDms(parseFloat(latDD));
    const long = ddToDms(parseFloat(longDD));
    setLatDMS(lat);
    setLongDMS(long);
  };

  const handleAddToMapsClick = () => {
    const lat = parseFloat(latDD);
    const long = parseFloat(longDD);
    if (!isNaN(lat) && !isNaN(long)) {
      onAddToMaps(lat, long);
    }
  };

  return (
    <InputForm
      title={`DD to DMS`}
      description={`Convert Coordinate Decimal Degrees (DD) to Degrees Minutes Seconds (DMS)`}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="latDD" className="text-right">
            Latitude
          </Label>
          <div className="col-span-3">
            <Input
              id="latDD"
              type={"number"}
              value={latDD}
              onChange={(e) => setLatDD(e.target.value)}
              placeholder="Decimal Degrees"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="longDD" className="text-right">
            Longitude
          </Label>
          <div className="col-span-3">
            <Input
              id="longDD"
              type={"number"}
              value={longDD}
              onChange={(e) => setLongDD(e.target.value)}
              placeholder="Decimal Degrees"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="button" onClick={handleConvert}>
            Convert
          </Button>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="latDMSValue" className="text-right">
            Latitude
          </Label>
          <div className="col-span-3 relative">
            <Input
              id="latDMSValue"
              value={`${latDMS.degrees}° ${latDMS.minutes}' ${latDMS.seconds}" ${latDMS.direction}`}
              className="cursor-default pr-10"
              disabled={true}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="longDMSValue" className="text-right">
            Longitude
          </Label>
          <div className="col-span-3 relative">
            <Input
              id="longDMSValue"
              value={`${longDMS.degrees}° ${longDMS.minutes}' ${longDMS.seconds}" ${longDMS.direction}`}
              className="cursor-default pr-10"
              disabled={true}
            />
          </div>
        </div>
      </div>
      <div className={`w-full`}>
        <Button
          type="submit"
          className={`w-full`}
          onClick={handleAddToMapsClick}
        >
          Add to Maps
        </Button>
      </div>
    </InputForm>
  );
}
