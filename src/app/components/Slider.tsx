"use client";
import { useState, useId, useEffect, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import Flashcard from "./Flashcard";
import StarRating from "./StarRating";
const slides = [
  [
    {
      review:
        "We rented a car from this website and had an amazing experience! The booking was easy and the rental rates were very affordable.",
      author: "Sunil Sikhawat",
      city: "Bhopal",
      rating: 4,
    },
    {
      review:
        "We are very happy with the service provided by this company. The car was clean and in good condition.",
      author: "Arun Chawla",
      city: "Pune",
      rating: 4.5,
    },
  ],
  [
    {
      review:
        "Thank you for the great service! We rented a car from this website and had an amazing experience. ",
      author: "Bunny Arora",
      city: "Indore",
      rating: 3.5,
    },
    {
      review:
        "I am very happy with the service provided by this company. The car was clean and in good condition. ",
      author: "Varun Kohli",
      city: "Delhi",
      rating: 4,
    },
  ],
  [
    {
      review:
        "It was a great experience renting from this company. The staff was friendly and helpful, the car was clean and in good condition.",
      author: "Mohan Shukla",
      city: "Indore",
      rating: 4.5,
    },
    {
      review:
        "The best car rental company in the world! We rented a car from this website and had an amazing experience. ",
      author: "Ron Krasavchik",
      city: "Indore",
      rating: 5,
    },
  ],
];

const Slider = () => {
  const [slide, setSlide]: [number, Function] = useState(0);
  const reviewCardRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    reviewCardRef?.current?.classList.remove("fade-in");
    reviewCardRef?.current?.offsetWidth;
    reviewCardRef?.current?.classList.add("fade-in");
  }, [slide]);
  useEffect(() => {
    document.body.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        setSlide((prev: number) => (prev + 1) % slides.length);
      }
      if (e.key === "ArrowLeft") {
        setSlide((prev: number) => (prev === 0 ? slides.length - 1 : prev - 1));
      }
    });
  }, []);
  const id = useId();
  return (
    <div className="flex flex-col items-center gap-8 text-left">
      <div
        className="flex flex-col lg:flex-row gap-8 justify-center"
        ref={reviewCardRef}
      >
        {slides[slide].map((s, index) => (
          <div
            key={`${id}-${index}`}
            className="py-16 px-4 md:px-12 flex flex-col bg-white w-full xl:w-[40%] rounded-sm shadow-xl mt-4"
          >
            <span className="text-2xl font-medium leading-9 tracking-wide">
              &quot;{s.review}&quot;
            </span>
            <div className="mt-auto pt-8 flex items-center gap-0 lg:gap-4">
              <Image
                src="/assets/car.png"
                height={50}
                width={50}
                alt="profile picture"
                className="mr-1"
              />
              <span>
                <h4 className="font-bold tracking-normal text-xs sm:text-xl">
                  {s.author}
                </h4>
                <p className="text-xs sm:text-lg">{s.city}</p>
              </span>
              <div className="ml-auto">
                <Flashcard
                  front={
                    <FontAwesomeIcon
                      icon={faQuoteRight}
                      className="text-6xl text-orange-500"
                    />
                  }
                  back={
                    <div className="mt-8">
                      <StarRating
                        flip={true}
                        rating={s.rating}
                        activeColor="text-orange-500"
                        inactiveColor="text-gray-500"
                        size="text-xl"
                      />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          className={`rounded-full ${
            slide === 0 ? "bg-orange-500" : "bg-gray-300"
          } hover:bg-orange-500 w-4 h-4 focus:outline-none transition-all duration-200`}
          onClick={() => setSlide(0)}
        ></button>
        <button
          className={`rounded-full ${
            slide === 1 ? "bg-orange-500" : "bg-gray-300"
          } hover:bg-orange-500 w-4 h-4 focus:outline-none transition-all duration-200`}
          onClick={() => setSlide(1)}
        ></button>
        <button
          className={`rounded-full ${
            slide === 2 ? "bg-orange-500" : "bg-gray-300"
          } hover:bg-orange-500 w-4 h-4 focus:outline-none transition-all duration-200`}
          onClick={() => setSlide(2)}
        ></button>
        
      </div>
    </div>
  );
};

export default Slider;