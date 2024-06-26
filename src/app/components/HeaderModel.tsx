import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MouseEventHandler } from "react";
import Link from "next/link";
import ReactDOM from "react-dom";

export default function HeaderModal({
  closeModal,
  isOpen,
}: {
  closeModal: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}) {
  return ReactDOM.createPortal(
    <div
      className={
        `modal absolute top-0 w-full h-full bg-gray-400 flex flex-col p-8 transition-all duration-500 ease-in-out backdrop-blur-md bg-opacity-50 ` +
        (isOpen ? "left-0" : "left-[-100%]")
      }
    >
      <button
        onClick={closeModal}
        className="ml-auto text-xl hover:text-red-500 mb-10"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
            <ul className="h-full text-center  flex flex-col justify-center">
                <li className="py-4 px-4 outline-none text-lg hover:text-red-500 cursor-pointer w-full">
                  <button onClick={closeModal}><Link href="/" >Home</Link></button>
                </li>
                <li className="py-4 px-4 outline-none text-lg hover:text-red-500 cursor-pointer w-full">
                  <button onClick={closeModal}><Link  href="/about">About</Link></button>
                </li>
                <li className="py-4 px-4 outline-none text-lg hover:text-red-500 cursor-pointer w-full">
                  <button onClick={closeModal}><Link  href="/vehicle-models">Models</Link></button>
                </li>
                <li className="py-4 px-4 outline-none text-lg hover:text-red-500 cursor-pointer w-full">
                  <button onClick={closeModal}><Link  href="/testimonials">Testimonials</Link></button>
                </li>
                <li className="py-4 px-4 outline-none text-lg hover:text-red-500 cursor-pointer w-full">
                  <button onClick={closeModal}><Link  href="/team">Our Team</Link></button>
                </li>
                <li className="py-4 px-4 outline-none text-lg hover:text-red-500 cursor-pointer w-full">
                  <button onClick={closeModal}><Link  href="/contact">Contact</Link></button>
                </li>
          </ul>
    </div>,
    document.body
  );
}