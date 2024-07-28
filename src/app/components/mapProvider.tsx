"use client";

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function GoogleMaps() {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const locationInMap = {
        lat: 27.694418231531728,
        lng: 85.32734418301817,
      };

      // MARKER

      const options: google.maps.MapOptions = {
        center: locationInMap,
        zoom: 15,

        mapId: "NEXT_MAPS_TUTS",
      };

      const map = new Map(mapRef.current as HTMLDivElement, options);

      // add the marker in the map
      const marker = new google.maps.Marker({
        map: map,
        position: locationInMap,
      });
    };

    initializeMap();
  }, []);

  return <div className="h-full w-full" ref={mapRef} />;
}
