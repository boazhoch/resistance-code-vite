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
    <main className="flex flex-col md:flex-row h-screen">
      <div
        className="flex flex-col items-center md:items-start justify-between h-1/2 md:h-full md:w-1/2 py-5"
        style={{ backgroundColor: "#3278FF" }}
      >
        <div className="mb-2 w-10% max-w-[50px] md:mr-10">
          <img src="logo.png" width={50} />
        </div>
        <div className="text-center md:text-right md:mr-10">
          <h2 style={{ fontSize: "6vmin", lineHeight: "normal" }}>
            יאללה תקווה
          </h2>
          <h1
            className="font-bold text-white mb-5"
            style={{ fontSize: "14vmin", lineHeight: "normal" }}
          >
            העלאת סרטונים
          </h1>
        </div>
        <div className="text-center md:text-right md:mr-10">
          <h2 style={{ fontSize: "6vmin", lineHeight: "normal" }}>
            # להיות עם חופשי בארצנו
          </h2>
        </div>
      </div>

      <div className="text-center h-1/2 md:w-1/2 md:h-screen">
        <div className="m-auto mb-3 mt-5 w-full max-w-4xl flex justify-center items-center">
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
