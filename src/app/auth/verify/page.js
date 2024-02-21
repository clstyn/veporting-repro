"use client";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Button from "@/app/ui/auth/button";
import { Fragment, useState } from "react";

export default function Verify() {
  const [isOpen, setIsOpen] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    await openModal();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="p-6">
        <div className="flex flex-col items-center">
          <Image
            src={`/email.svg`}
            alt="email"
            width={120}
            height={120}
            className="mx-auto"
          />
          <h2 className={`font-bold text-zinc-600 text-2xl text-center mt-4`}>
            Masukkan Email
          </h2>
          <p className="px-4 text-center max-w-[70%] text-wrap">
            Kode verifikasi akan dikirimkan ke alamat email anda
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mt-4">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="font-medium font-[#535353] mb-2"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                className="bg-[#F6F6F6] border border-[#BFBFBF] rounded-md h-12 focus:outline-none px-2"
              />
            </div>
          </div>
          <Button type="submit" className={`mt-4`}>
            Kirim Kode
          </Button>
        </form>
      </div>

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
                  <Dialog.Title as={Fragment}>
                    <Image
                      src={`/success.svg`}
                      alt="success"
                      width={120}
                      height={120}
                      className="mx-auto"
                    />
                  </Dialog.Title>
                  <div className="mt-4 flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-zinc-600">
                      Kode Telah Terkirim
                    </h2>
                    <p className="text-sm text-gray-500 max-w-[60%] text-center">
                      Cek email anda dan ketikan kode yang tertera
                    </p>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center text-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
