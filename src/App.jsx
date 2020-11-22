import React from "react";
import { Header, Footer } from "./Components/Header";
import WorkArea from "./Container/WorkArea";

export default function App() {
  return (
    <div className={"base"}>
      <Header />
      <WorkArea />
      <Footer />
    </div>
  );
}
