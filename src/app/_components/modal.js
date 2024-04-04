// belum jadi
'use client';

import { Fragment, forwardRef, useRef, useImperativeHandle, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Button from "@/app/_components/auth/button";

export const Modal = forwardRef(function Modal(
  {
  type = "",
  children,
  exitButton = "",
  noImage = false,
  handleExit = () => {},
  handleBeforeLoad = () => {},
  },
  ref
) {

  useImperativeHandle(ref, () => ({
    openModal: () => {
      openModal();
    },
    closeModal: () => {
      closeModal();
    }
  }));

  const [isOpen, setIsOpen] = useState(false)

  const imageUrl = {
    success: "/success.svg",
    failed: "/failed.svg",
    password: "/key.svg",
    email: "/email.svg",
    confirm: "/question.svg"
  }

  function closeModal() {
    if (handleExit) {
      handleExit();
    }
    setIsOpen(false)
  }

  function openModal() {
    if (handleBeforeLoad) {
      handleBeforeLoad();
    }
    setIsOpen(true)
  }
  
  return (
    <>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title>
                  {!noImage ? (
                    <Image
                    src={Object.keys(imageUrl).includes(type) ? imageUrl[type] : "/success.svg"}
                    alt={Object.keys(imageUrl).includes(type) ? type : "success"}
                    width={120}
                    height={120}
                    className="mx-auto"
                  />) : null  
                  }
                </Dialog.Title>
                
                 {children}

                 {exitButton && (
                  <Button className="mt-4" onClick={closeModal}>
                    {exitButton}
                  </Button>)}
      
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
    </>
    

   
  );
});

