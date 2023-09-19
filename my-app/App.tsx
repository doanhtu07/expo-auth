import React, { useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { useAuth0, Auth0Provider } from "react-native-auth0";

const Home = () => {
  const { authorize, clearSession, user, error, isLoading } = useAuth0();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onLogin = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log("Log out cancelled");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  const loggedIn = user !== undefined && user !== null;

  return (
    <View style={styles.container}>
      {loggedIn && <Text>You are logged in as {user.name}</Text>}
      {!loggedIn && <Text>You are not logged in</Text>}
      {error && <Text>{error.message}</Text>}

      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? "Log Out" : "Log In"}
      />
    </View>
  );
};

const App = () => {
  return (
    <Auth0Provider
      domain={"dev-513zdgahym6uv22d.us.auth0.com"}
      clientId={"02Q5Ick0MdcOHSCbx5uV05mKvY1ehEUh"}
    >
      <Home />
    </Auth0Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontSize: 32,
  },
});

export default App;

// import * as AuthSession from "expo-auth-session";
// import jwtDecode from "jwt-decode";
// import { useEffect, useState } from "react";
// import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";

// // You need to swap out the Auth0 client id and domain with the one from your Auth0 client.
// // In your Auth0 client, you need to also add a url to your authorized redirect urls.
// //
// // For this application, I added https://auth.expo.io/@arielweinberger/with-auth0 because I am
// // signed in as the 'arielweinberger' account on Expo and the name/slug for this app is 'with-auth0'.
// //
// // You can open this app in the Expo client and check your logs to find out your redirect URL.

// const auth0ClientId = "02Q5Ick0MdcOHSCbx5uV05mKvY1ehEUh";
// const authorizationEndpoint =
//   "https://dev-513zdgahym6uv22d.us.auth0.com/authorize";

// const redirectUri = AuthSession.makeRedirectUri({});

// export default function App() {
//   const [name, setName] = useState<string | null>(null);

//   const [request, result, promptAsync] = AuthSession.useAuthRequest(
//     {
//       redirectUri,
//       clientId: auth0ClientId,
//       // id_token will return a JWT token
//       responseType: "id_token",
//       // retrieve the user's profile
//       scopes: ["openid", "profile"],
//       extraParams: {
//         // ideally, this will be a random value
//         nonce: "nonce",
//       },
//     },
//     { authorizationEndpoint }
//   );

//   // Retrieve the redirect URL, add this to the callback URL list
//   // of your Auth0 application.
//   console.log(`Redirect URL: ${redirectUri}`);

//   useEffect(() => {
//     if (result) {
//       if (result.type === "error" && result.error) {
//         Alert.alert(
//           "Authentication error",
//           result.params.error_description || "something went wrong"
//         );
//         return;
//       }
//       if (result.type === "success") {
//         // Retrieve the JWT token and decode it
//         const jwtToken = result.params.id_token;
//         const decoded = jwtDecode(jwtToken);

//         const { name } = decoded as { name: string };
//         setName(name);
//       }
//     }
//   }, [result]);

//   return (
//     <View style={styles.container}>
//       {name ? (
//         <>
//           <Text style={styles.title}>You are logged in, {name}!</Text>
//           <Button title="Log out" onPress={() => setName(null)} />
//         </>
//       ) : (
//         <Button
//           disabled={!request}
//           title="Log in with Auth0"
//           onPress={() => promptAsync({})}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 20,
//     textAlign: "center",
//     marginTop: 40,
//   },
// });
