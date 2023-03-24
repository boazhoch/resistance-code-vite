import { Login } from "./components/Login/Login";
import { FileUploader, UserContext } from "./components/FileUploader";
import { useGeo } from "./components/GeoLocation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const date = new Date();
const futureDate = date.getDate() + 3;
date.setDate(futureDate);
const defaultValue = date.toLocaleDateString("he");

const CitySelection = (props: {
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

function App() {
  const {
    state: { city: geoCity, isLoading },
    getCity,
  } = useGeo();

  const [city, setCity] = useState(geoCity);
  const [date, setDate] = useState(dayjs(new Date()).format("YYYY-MM-DD"));

  return (
    <main className="p-3">
      <div className="text-center m-auto mb-2 w-10% max-w-[50px]">
        <img src="logo.jpeg" width={50} />
      </div>
      <h1
        className="text-black font-bold text-center mb-5"
        style={{ fontSize: "12vmin", lineHeight: "normal" }}
      >
        יאללה תקווה שליחת סרטונים
      </h1>
      <div className="text-center">
        <div className="m-auto mb-3 w-full max-w-4xl flex justify-center items-center">
          {isLoading && !city ? (
            <>
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </>
          ) : null}
          <CitySelection
            selected={city}
            setSelectedCity={(selectedCity) => {
              setCity(selectedCity.trim());
            }}
          />
          <div className="relative mr-2">
            <input
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-[16px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div>
        </div>
        <Login
          renderWhenUserLoggedIn={(user) => {
            return user ? (
              <UserContext.Provider value={{ city, date }}>
                <FileUploader />
              </UserContext.Provider>
            ) : null;
          }}
        />
      </div>
    </main>
  );
}

export default App;
