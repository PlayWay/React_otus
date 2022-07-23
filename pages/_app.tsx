import React from "react";
import "../style/main.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/store";
import { AuthProvider } from "../components/Auth/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <PersistGate loading={"Загрузка"} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </AuthProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default MyApp;
