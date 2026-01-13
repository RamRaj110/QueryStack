import LeftSideBar from "@/components/navigation/LeftSideBar";
import Navbar from "@/components/navigation/navbar";
import RightSideBar from "@/components/navigation/RightSideBar";
import React from "react";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-6 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl ">{children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
}

export default RootLayout;
