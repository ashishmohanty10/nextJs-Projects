"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { pages } from "next/dist/build/templates/app-page";

type Props = {};

export default function ClientPagination({}: Props) {
  const [data, setData] = useState<{ image: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemsIndex = lastItemIndex - itemsPerPage;
  const currentItems = data.slice(firstItemsIndex, lastItemIndex);

  const generateFakeData = () => {
    const newImage = faker.image.urlPicsumPhotos();
    return { image: newImage };
  };

  const resetLocalStorage = () => {
    localStorage.removeItem("fakerData");
    setData([]);
  };
  useEffect(() => {
    const storedData = localStorage.getItem("fakerData");

    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      const newData = Array.from({ length: 40 }, generateFakeData);
      localStorage.setItem("fakerData", JSON.stringify(newData));
    }
  });

  return (
    <>
      <Button onClick={resetLocalStorage} className="my-10">
        Reset
      </Button>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentItems.map((item, index) => {
          return (
            <Card key={index} className="rounded-md overflow-hidden">
              <div className="group flex transform flex-col overflow-hidden transition-all duration-200">
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={item.image}
                    alt=""
                    width={600}
                    height={400}
                    className="rounded-md h-full w-full transform object-cover transition-all duration-200 group-hover:scale-105"
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <PaginationSection
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

function PaginationSection({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalItems: any;
  itemsPerPage: any;
  currentPage: any;
  setCurrentPage: any;
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePrevPage()} />
        </PaginationItem>

        {pages.map((page, index) => {
          return (
            <PaginationItem
              key={index}
              className={
                currentPage === page ? "bg-neutral-100 rounded-md " : ""
              }
            >
              <PaginationLink onClick={() => setCurrentPage(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext onClick={() => handleNextPage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
