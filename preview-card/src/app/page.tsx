"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageProp {
  img: string;
}

const page = () => {
  const [currentIndex, setCurrentindex] = useState<number>(0);

  const handleImages = (index: number) => {
    setCurrentindex(index);
  };

  const previewImg: ImageProp[] = [
    {
      img: "/basketBall.svg",
    },
    {
      img: "/nikeAirmag.svg",
    },
    {
      img: "/nikeLogo1.svg",
    },
    {
      img: "/nikeLogo2.svg",
    },
  ];
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className=" -gray-500 rounded-md h-[500px] w-[400px] p-2">
        <div className="flex justify-center">
          <Image
            src={previewImg[currentIndex].img}
            alt="Main Img"
            width={400}
            height={400}
            className=" p-2 rounded-md"
          />
        </div>

        <div className="my-5 flex justify-center items-center gap-5">
          {previewImg.map((data, idx) => {
            return (
              <div key={idx}>
                <Image
                  className="p-2 hover:border"
                  src={data.img}
                  alt="Preview Img"
                  width={60}
                  height={60}
                  onClick={() => handleImages(idx)}
                />
              </div>
            );
          })}
        </div>

        <div>
          <h1 className="text-center font-medium text-sm">
            This is a Product showcase
          </h1>
        </div>
      </div>
    </div>
  );
};

export default page;
