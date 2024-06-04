"use client";
import Image from "next/image";
import Link from "next/link";
import InfoDrop from "./components/InfoDrop";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  scrollToBooking,
  signToScrollEvents,
  scrollToTop,
} from "./helpers/scrollHelper";
import "@fortawesome/fontawesome-svg-core/styles.css";
import BookCar from "./components/BookCar";

import { config } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleCheck,
  faArrowAltCircleRight,
  faChevronUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import CarPicker from "./components/CarPicker";
import Slider from "./components/Slider";
import DownloadButton from "./components/DownloadButton";
import ReactDOM from "react-dom";

config.autoAddCss = false;

function BookModal({
  setModalOpen,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  if (typeof window === "object") {
    return ReactDOM.createPortal(
      <div
        id="defaultModal"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full p-4 h-full overflow-x-hidden overflow-y-auto md:inset-0 bg-gray-500 bg-opacity-20 "
      >
        <div className="relative bg-white w-1/2 h-full rounded-lg shadow dark:bg-gray-700">
          <FontAwesomeIcon icon={faXmark} onClick={() => setModalOpen(false)} />
        </div>
      </div>,
      document.body
    );
  }
  return null;
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [models, setModels] = useState([]);
  const [fastScrollVisible, setFastScrollVisible] = useState(false);

  function onPageScroll() {
    if (window.scrollY > 500) {
      setFastScrollVisible(true);
    } else {
      setFastScrollVisible(false);
    }
  }
  useEffect(() => {
    fetch("/data/models.json")
      .then((data) => data.json())
      .then((json) => {
        setModels(json.data);
      });
    signToScrollEvents();

    window.addEventListener("scroll", (e: Event) => onPageScroll());
    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="flex flex-col justify-center relative items-center w-full overflow-x-hidden ">
      {modalOpen && <BookModal setModalOpen={setModalOpen} />}
      <section
        className="py-12 px-4 md:px-24 flex w-full justify-center"
        id="home"
      >
        <Image
          src="/assets/bg-shape.png"
          height={1000}
          width={800}
          alt="background shape"
          className="absolute hidden lg:block right-0 top-0 z-[-1]"
        />
        <div className="home_content">
          <div className="content_text text-center lg:text-left">
            <h1 className="text-5xl font-extrabold">
              Save <span className="text-red-500">big</span> with our car
              rental
            </h1>
            <p className="mt-4 text-lg">
              Rent the car of your dreams. Unbeatable prices, unlimited miles,
              flexible pick-up options and much more.
            </p>
          </div>
          <div className="home_buttons flex flex-col sm:flex-row gap-2 mt-4">
            <button
              onClick={scrollToBooking}
              className="bg-[#c6202b] py-4 px-9 ml-0 sm:ml-auto lg:ml-0 text-center text-white font-semibold rounded-md hover:bg-[#e7646e] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Ride
              <FontAwesomeIcon icon={faCircleCheck} className="ml-1" />
            </button>
            <Link
              href="/"
              className="bg-black mr-0 sm:mr-auto lg:mr-0 py-4 px-9 text-white text-center font-semibold rounded-md hover:bg-white hover:text-black transition-all duration-300 border-black border-2"
            >
              Learn More
              <FontAwesomeIcon icon={faArrowAltCircleRight} className="ml-1" />
            </Link>
          </div>
        </div>
        <div className="home_image">
          <Image
            src="/assets/car.png"
            height={500}
            width={1000}
            alt="car"
            className="hidden lg:block"
          />
        </div>
      </section>
      <BookCar models={models} setModalOpen={setModalOpen} />
      <section
        data-aos="fade-up"
        className="flex flex-col gap-6 py-12 px-4 md:px-24 items-center bg-gradient-to-b w-full"
        style={{ background: "linear-gradient(180deg,#f8f8f8 20%,#fff 80%)" }}
        id="process-description"
      >
        <h2 className="font-bold text-2xl">Plan your trip now</h2>
        <h1 className="font-extrabold text-5xl">Quick & easy car rental</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 auto-rows-auto gap-8">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/assets/select-car.png"
              height={125}
              width={125}
              alt="select car image"
            />
            <h2 className="font-bold text-2xl">Select Car</h2>
            <p className="text-xl mt-4 text-gray-500">
              We offers a big range of vehicles for all your driving needs. We
              have the perfect car to meet your needs
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              src="/assets/contact-operator.png"
              height={125}
              width={125}
              alt="contact operator image"
            />
            <h2 className="font-bold text-2xl">Contact Operator</h2>
            <p className="text-xl mt-4 text-gray-500">
              Our knowledgeable and friendly operators are always ready to help
              with any questions or concerns
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              src="/assets/lets-drive.png"
              height={125}
              width={125}
              alt="contact operator image"
            />
            <h2 className="font-bold text-2xl">Let&apos;s Drive</h2>
            <p className="text-xl mt-4 text-gray-500">
              Whether you&apos;re hitting the open road, we&apos;ve got you
              covered with our wide range of cars
            </p>
          </div>
        </div>
      </section>
      <section
        className="flex flex-col items-center text-center py-12 px-4 md:px-24 bg-white w-full justify-center"
        id="pick-car"
      >
        <h2 className="font-bold text-2xl">Vehicle Models</h2>
        <h1 className="font-extrabold text-5xl">Our rental feet</h1>
        <p className="text-xl mt-4 text-gray-500 w-full lg:w-1/2 mb-4">
          Choose from a variety of our amazing vehicles to rent for your next
          adventure or business trip
        </p>
        <CarPicker models={models} />
      </section>
      <section className="flex flex-col items-center text-center gap-2 py-12 px-4 md:px-24 text-white bg-gray-950 w-full">
        <span className="text-5xl font-black">
          Save big with our cheap car rental!
        </span>
        <span className="text-2xl">
          Top Airports. Local Suppliers.{" "}
          <span className="text-red-500">24/7</span> Support.
        </span>
      </section>
      <section
        className="flex flex-col items-center text-center gap-2 py-12 px-4 md:px-24 w-full bg-[url('/assets/skrrt.png')] bg-no-repeat bg-cover bg-white"
        id="testimonials"
        data-aos="fade-left"
      >
        <Image
          src="/assets/cars-showoff.png"
          width={800}
          height={800}
          alt="cars showoff image"
        />
        <div className="flex flex-col lg:flex-row gap-16 text-lg justify-between">
          <div className="flex flex-col w-full lg:w-[55%] text-left">
            <h4 className="font-bold text-2xl">Why Choose Us</h4>
            <h2 className="font-bold text-5xl">
              Best valued deals you will ever find
            </h2>
            <p className="text-gray-500 mt-4">
              Discover the best deals you&apos;ll ever find with our unbeatable
              offers. We&apos;re dedicated to providing you with the best value
              for your money, so you can enjoy top-quality services and products
              without breaking the bank. Our deals are designed to give you the
              ultimate renting experience, so don&apos;t miss out on your chance
              to save big.
            </p>
            <button className="bg-[#c6202b] mx-auto lg:mx-0 py-4 px-6 w-full md:w-1/3 text-white mt-4 font-extrabold shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] hover:bg-[#c6202b] hover:shadow-[6px_6px_2px_2px_rgba(0,0,0,0.1)] transition duration-200 rounded-lg">
              Find Details
            </button>
          </div>
          <div className="flex flex-col gap-8 w-full justify-center items-center lg:w-1/3 text-center lg:text-left">
            <div className="flex flex-col items-center ml-0 lg:ml-auto lg:flex-row gap-4">
              <Image
                src="/assets/cross-country-drive.png"
                height={100}
                width={100}
                alt="backround car tire shape"
              />
              <div>
                <h4 className="font-bold text-2xl">Cross Country Drive</h4>
                <p className="text-gray-500">
                  Take your driving experience to the next level with our
                  top-notch vehicles for your cross-country adventures.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center ml-0 lg:ml-auto lg:flex-row gap-4">
              <Image
                src="/assets/all-inclusive-pricing.png"
                height={100}
                width={100}
                alt="backround car tire shape"
              />
              <div>
                <h4 className="font-bold text-2xl">All Inclusive Pricing</h4>
                <p className="text-gray-500">
                  Get everything you need in one convenient, transparent price
                  with our all-inclusive pricing policy.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center ml-0 lg:ml-auto lg:flex-row gap-4">
              <Image
                src="/assets/no-hidden-charges.png"
                height={100}
                width={100}
                alt="backround car tire shape"
              />
              <div>
                <h4 className="font-bold text-2xl">No Hidden Charges</h4>
                <p className="text-gray-500">
                  Enjoy peace of mind with our no hidden charges policy. We
                  believe in transparent and honest pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="flex flex-col items-center text-center gap-2 py-12 px-12 lg:px-8 xl:px-24 w-full bg-[#F8F8F8]"
        id="rewiews"
        data-aos="zoom-in"
      >
        <h4 className="font-bold text-2xl">Reviewed by People</h4>
        <h2 className="font-bold text-5xl">Client&apos;s Testimonials</h2>
        <p className="text-gray-500 w-full lg:w-1/2">
          Discover the positive impact we&apos;ve made on the our clients by
          reading through their testimonials. Our clients have experienced our
          service and results, and they&apos;re eager to share their positive
          experiences with you.
        </p>
        <Slider />
      </section>
      <section
        className="flex flex-col items-center text-center gap-2 py-12 px-4 md:px-24 w-full bg-white"
        id="faq"
      >
        <h5 className="font-bold text-xl">FAQ</h5>
        <h2 className="font-bold text-5xl">Frequently Asked Questions</h2>
        <p className="text-gray-500 w-full lg:w-1/2 text-lg">
          Frequently Asked Questions About the Car Rental Booking Process on Our
          Website: Answers to Common Concerns and Inquiries.
        </p>
        <InfoDrop />
      </section>
      <section
        className="flex flex-col items-start text-left gap-2 py-24 px-4 md:px-24 w-full bg-[#F8F8F8] text-lg bg-[url('/assets/bg-download.png')] h-auto bg-cover bg-no-repeat"
        id="download-app"
      >
        <div className="w-full lg:w-2/3">
          <span>
            <h2 className="text-5xl font-bold lg:px-2">
              Download our app to get most out of it
            </h2>
            <p className="mt-4 text-lg w-2/3">
              Thrown shy denote ten ladies though ask saw. Or by to he going
              think order event music. Incommode so intention defective at
              convinced. Led income months itself and houses you.
            </p>
          </span>
          <div className="flex flex-col md:flex-row gap-8 mt-4">
            <DownloadButton store="App Store" />
            <DownloadButton store="Google Play" />
          </div>
        </div>
      </section>
      {fastScrollVisible && (
        <button
          className="fixed top-[90%] z-10 left-[75%] lg:left-[95%] bg-[#c6202b] border-[#E9E9E9] text-white px-3 py-2 hover:text-black hover:bg-white border-2 hover:border-black rounded-lg"
          onClick={scrollToTop}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
    </div>
  );
}

