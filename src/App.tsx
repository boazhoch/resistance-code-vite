import { Login } from "./components/Login";
import React, { useState } from "react";

import "./App.css";
import { FileUploader } from "./components/FileUploader";

function App() {
  return (
    <main className="p-3">
      <h1
        className="text-black font-bold text-center mb-5"
        style={{ fontSize: "12vmin", lineHeight: "normal" }}
      >
        הצטרפו למאבק להצלת מדינת ישראל ודמקורטיה
      </h1>
      <div className="text-center">
        <Login
          renderWhenUserLoggedIn={(user) => {
            return user ? (
              <FileUploader
                renderFiles={(files) => {
                  return (
                    <section className="overflow-hidden text-neutral-700">
                      <div className="container mx-auto pt-5">
                        <div className="-m-1 flex flex-wrap md:-m-2">
                          {files.map((file) => {
                            return (
                              <div className="flex md:w-1/3 lg:w-1/5 flex-wrap w-1/2">
                                <div className="w-full p-1 md:p-2">
                                  <img
                                    alt="gallery"
                                    className="block h-full w-full rounded-lg object-cover object-center shadow-md"
                                    src={file}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </section>
                  );
                }}
              />
            ) : null;
          }}
        />
      </div>
    </main>
  );
}

export default App;
