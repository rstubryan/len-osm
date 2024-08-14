import { useEffect, useState } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
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
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

/**
 * Komponen template peta yang menggunakan OpenLayers untuk menampilkan peta dan menambahkan marker sesuai dengan apa yang diinputkan user.
 *
 * @returns {JSX.Element} Elemen JSX yang mewakili template peta.
 */
export function MapTemplates() {
  const [map, setMap] = useState<Map | null>(null);
  const [markerSource, setMarkerSource] = useState<VectorSource | null>(null);

  /**
   * Menginisialisasi peta dan layer marker saat komponen pertama kali dirender.
   */
  useEffect(() => {
    const initialMap = new Map({
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

    const source = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: source,
    });

    initialMap.addLayer(vectorLayer);
    setMap(initialMap);
    setMarkerSource(source);

    return () => {
      initialMap.setTarget("");
    };
  }, []);

  /**
   * Menambahkan marker ke peta berdasarkan koordinat latitude dan longitude yang diberikan.
   *
   * @param {number} lat - Koordinat latitude.
   * @param {number} long - Koordinat longitude.
   */
  const handleAddToMaps = (lat: number, long: number) => {
    if (map && markerSource) {
      const coordinates = fromLonLat([long, lat]);
      const markerFeature = new Feature({
        geometry: new Point(coordinates),
      });
      markerFeature.setStyle(
        new Style({
          image: new Icon({
            src: "https://openlayers.org/en/latest/examples/data/icon.png",
            anchor: [0.5, 1],
          }),
        }),
      );
      markerSource.clear();
      markerSource.addFeature(markerFeature);
      map.getView().setCenter(coordinates);
    }
  };

  return (
    <>
      <div id="map" className={`w-full h-96 min-h-screen z-0 relative`}>
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
                  <DmsToDdForm onAddToMaps={handleAddToMaps} />
                </TabsContent>
                <TabsContent value="dd">
                  <DdToDmsForm onAddToMaps={handleAddToMaps} />
                </TabsContent>
              </Tabs>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
