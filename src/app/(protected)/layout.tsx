"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import WebsiteHeader from "@/components/common/WebsiteHeader";

export default function ProtectedRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <WebsiteHeader />
      {children}
    </Provider>
  );
}
