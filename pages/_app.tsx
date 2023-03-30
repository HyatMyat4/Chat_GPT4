import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import SideBar from "./SideBar";
import { Provider } from "react-redux";
import { store } from "../setting/store";
import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider enableSystem={true} attribute="class">
          <NextNProgress
            options={{ easing: "ease", speed: 500, showSpinner: false }}
            color="#009688"
          />
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <div className="w-full h-screen frc  justify-center bg-slate-100 dark:bg-[#343541] overflow-y-hidden  ">
                <Component {...pageProps} />
              </div>
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
}
