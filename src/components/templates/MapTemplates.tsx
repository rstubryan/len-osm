import { useEffect } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import { DmsToDdForm } from "@/components/organisms/DmsToDdForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import { DdToDmsForm } from "@/components/organisms/DdToDmsForm";

export function MapTemplates() {
  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    return () => {
      map.setTarget("");
    };
  }, []);

  return (
    <>
      <div id="map" className={`w-full h-96 min-h-screen z-0`}>
        <Dialog>
          <DialogTrigger asChild>
            <Button className={`bg-primary/70 absolute top-5 right-5 z-50`}>
              <Settings size={24} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <Tabs defaultValue="dms" className="w-full mt-5">
                <TabsList className={`w-full`}>
                  <TabsTrigger value="dms" className={`w-full`}>
                    DMS to DD
                  </TabsTrigger>
                  <TabsTrigger value="dd" className={`w-full`}>
                    DD to DMS
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="dms">
                  <DmsToDdForm />
                </TabsContent>
                <TabsContent value="dd">
                  <DdToDmsForm />
                </TabsContent>
              </Tabs>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
