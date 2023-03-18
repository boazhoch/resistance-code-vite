import { Login } from "./components/Login/Login";
import React, { useState } from "react";
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
            return user ? <FileUploader /> : null;
          }}
        />
      </div>
    </main>
  );
}

export default App;
