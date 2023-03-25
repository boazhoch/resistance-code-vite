import { Hub, Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

const Login = ({
  renderWhenUserLoggedIn,
}: {
  renderWhenUserLoggedIn: (user?: object) => React.ReactNode;
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          break;

        case "signOut":
          setUser(null);
          break;
      }
    });
    Auth.currentAuthenticatedUser()
      .then((currentUser) => setUser(currentUser))
      .catch(() => console.log("Not signed in"));
    return unsubscribe;
  }, []);

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
          className="hover:bg-white text-black h-5/6 w-5/6 mt-5 font-bold border-2 border-dashed	border-blue-300	rounded transition-all duration-200 ease-in-out"
          type="button"
          onClick={() => {
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google,
            });
          }}
          style={{ backgroundColor: "rgba(201, 219, 255, 0.1)" }}
        >
          <div className="flex flex-col items-center justify-center ">
            <img className="" src="upload.png" width={200} />
            <h2 style={{fontSize: "1.3em"}}> יאללה להעלות!</h2>
          </div>
        </button>
      )}
    </>
  );
};
export { Login };
