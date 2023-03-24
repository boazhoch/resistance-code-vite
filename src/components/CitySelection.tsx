import { useState, useEffect } from "react";

export const CitySelection = (props: {
  selected?: string;
  setSelectedCity: (city: string) => void;
}) => {
  const { selected } = props;
  const [cities, setCities] = useState<string[]>([]);
  useEffect(() => {
    fetch(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=100000"
    ).then((res) => {
      res.json().then((payload) => {
        const cities = payload.result.records.map((c: any) => c["שם_ישוב"]);
        setCities(cities);
      });
    });
  }, []);
  return (
    <div className="flex">
      <label
        htmlFor="cities"
        className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        בחר עיר
      </label>
      <select
        id="cities"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          props.setSelectedCity(e.target.value);
        }}
      >
        {!selected ? (
          <option selected>בחר עיר</option>
        ) : (
          <option>בחר עיר</option>
        )}
        {cities.map((name) => {
          return (
            <option
              value={name}
              selected={name.replace(/ /g, "") === selected?.replace(/ /g, "")}
            >
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
