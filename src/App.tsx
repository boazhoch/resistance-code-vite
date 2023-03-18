import React, { useEffect, useMemo, useState } from "react";

import "./App.css";

("use client");

import { Hub, Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

const FileUploader = ({
  renderFiles,
}: {
  renderFiles: (media: string[]) => React.ReactNode;
}) => {
  const [files, setFiles] = useState<FileList>();

  const previewObjectUrls = useMemo(() => {
    if (!files) {
      return [];
    }

    const objectUrls = Array.from(files).map(URL.createObjectURL);

    return objectUrls;
  }, [files]);

  // create a preview as a side effect, whenever selected file is changed

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="mb-3 w-full max-w-md">
        <label
          htmlFor="formFileMultiple"
          className="mb-2 inline-block text-neutral-700 dark:text-neutral-200 cursor-pointer"
        >
          Multiple files input example
        </label>
        <input
          accept="video/*, image/*"
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 dark:border-neutral-600 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 dark:text-neutral-200 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 dark:file:bg-neutral-700 file:px-3 file:py-[0.32rem] file:text-neutral-700 dark:file:text-neutral-100 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
          type="file"
          id="formFileMultiple"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              setFiles(e.target.files);
            }
          }}
        />
      </div>
      <div>{renderFiles(previewObjectUrls)}</div>
    </div>
  );
};

const Login = ({
  renderWhenUserLoggedIn,
}: {
  renderWhenUserLoggedIn: (user?: object) => React.ReactNode;
}) => {
  const [user, setUser] = useState(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          break;
        case "customOAuthState":
          setCustomState(data);
      }
    });

    Auth.currentAuthenticatedUser()
      .then((currentUser) => setUser(currentUser))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);

  console.log(user);

  return (
    <>
      {user ? (
        <>
          <button
            className="bg-blue-600 hover:text-blue-600 hover:bg-white text-white font-bold py-2 px-4 shadow-md rounded transition-all duration-200 ease-in-out  mb-5"
            type="button"
            onClick={() => Auth.signOut()}
          >
            התנתק/י
          </button>
          {renderWhenUserLoggedIn(user)}
        </>
      ) : (
        <button
          className="bg-blue-600 hover:text-blue-600 hover:bg-white text-white font-bold py-2 px-4 shadow-md rounded transition-all duration-200 ease-in-out"
          type="button"
          onClick={() => {
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google,
            });
          }}
        >
          התחבר/י
        </button>
      )}
    </>
  );
};

export { Login };

function App() {
  const [count, setCount] = useState(0);

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
