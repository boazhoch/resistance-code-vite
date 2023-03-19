import { useEffect, useRef, useState } from "react";
import useGeolocation from "react-use/lib/useGeolocation";

export const useGeo = () => {
  const [state, setState] = useState({ city: "", isLoading: false });

  const getGeolocation = () => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((e) => {
        return resolve(e);
      });
    });
  };

  const getCity = async () => {
    setState((value) => ({ ...value, isLoading: true }));

    const geo = await getGeolocation();

    const state = geo;

    const latitude = state.coords.latitude?.toString();
    const longitude = state.coords.longitude?.toString();

    if (!latitude || !longitude) {
      return;
    }

    const req = new URL(
      "/data/reverse-geocode-client",
      "https://api.bigdatacloud.net"
    );

    req.searchParams.append("latitude", latitude);
    req.searchParams.append("longitude", longitude);

    fetch(req)
      .then((response) => {
        if (response.ok) {
          response.json().then((responseData: { city: string }) => {
            console.log(responseData);

            setState((value) => ({
              city: responseData.city,
              isLoading: false,
            }));
          });
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    getCity();
  }, []);

  return {
    getCity,
    state,
  };
};
