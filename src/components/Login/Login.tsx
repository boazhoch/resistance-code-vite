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
          התחבר/י כדי להעלאות קבצים
        </button>
      )}
    </>
  );
};
export { Login };
