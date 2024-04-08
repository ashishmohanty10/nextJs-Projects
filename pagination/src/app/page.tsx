import ClientPagination from "@/components/client-pagintaion";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <span className="text-4xl font-bold">Gallery</span>
      <ClientPagination />
    </div>
  );
}
