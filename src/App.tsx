import { CitySelection } from "./components/CitySelection";
import { Login } from "./components/Login/Login";
import { FileUploader, UserContext } from "./components/FileUploader";
import { useGeo } from "./components/GeoLocation";
import { useState } from "react";
import dayjs from "dayjs";

function App() {
  const {
    state: { city: geoCity },
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
