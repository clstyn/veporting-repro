"use client";

import Image from "next/image";
import { Fragment, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "../modal";

export default function Verify() {
  const clickRef = useRef(null);
  const [time, setTime] = useState({
    minutes: parseInt(1),
    seconds: parseInt(0),
  });
  const [isExpired, setIsExpired] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const router = useRouter();

  const onSubmit = async (event) => { 
    if (isExpired) {
      alert("Kode sudah kadaluarsa");
      return;
    }
    if (verificationCode === "123456") {
      setIsTrue(true);
    } else {
      setIsTrue(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleCorrectCode = () => {
    router.push("/auth/reset-password");
  };

  const handleWrongCode = () => {
    setVerificationCode("");
  };

  useEffect(() => {
    const handleCloseOnOutsideClick = (event) => {
      if (clickRef.current && !clickRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleCloseOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleCloseOnOutsideClick);
    };
  }, [clickRef]);

  useEffect(() => {
    let timer = setInterval(() => {
      if (time.seconds > 0) {
        setTime((prevState) => ({
          ...prevState,
          seconds: prevState.seconds - 1,
        }));
      }
      if (time.seconds === 0) {
        if (time.minutes === 0) {
          clearInterval(timer);
          setIsExpired(true);
        } else {
          setTime((prevState) => ({
            minutes: prevState.minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return (
    <>
      <div className="p-6">
        <div className="flex flex-col items-center">
          <Image
            src={`/password.svg`}
            alt="passwordIcon"
            width={120}
            height={120}
            className="mx-auto"
          />
          <h2 className={`font-bold text-zinc-600 text-2xl text-center mt-4`}>
            Masukkan Kode
          </h2>
          <p className="px-4 text-center max-w-[80%] text-wrap">
            Kode verifikasi telah dikirimkan ke alamat email anda
          </p>
        </div>
        <div>
          <div className="mt-4">
            <div className="flex flex-col">
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                onChange={(e) => setVerificationCode(e.target.value)}
                value={verificationCode}
                maxLength={6}
                className="bg-[#F6F6F6] border border-[#BFBFBF] rounded-md h-12 focus:outline-none px-2 text-center text-xl tracking-[1em] font-bold"
              />
            </div>
          </div>

          <p className="my-2">
            - Kode akan berakhir dalam{" "}
            <span className="font-bold">
              {time.minutes}:
              {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
            </span>
          </p>
          <p className="my-2">
            - Tidak menerima kode?{" "}
            <Modal
              buttonClass="font-bold text-red-500 hover:underline"
              buttonType="custom"
              buttonText={"Kirim ulang"}
              type={"success"}
            >
              <div className="mt-4 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-zinc-600">
                  Kode dikirim ulang
                </h2>
                <p className="text-sm text-gray-500 max-w-[60%] text-center">
                  Kode verifikasi telah dikirimkan ulang ke alamat email anda
                </p>
              </div>
            </Modal>
          </p>
          <Modal
            buttonClass={`mt-4`}
            buttonText={`Verifikasi Kode`}
            type={isTrue ? "success" : "failed"}
            exitButton={isTrue ? "Buat Password Baru" : "Ketik Ulang"}
            handleExit={isTrue ? handleCorrectCode : handleWrongCode}
            handleBeforeLoad={onSubmit}
          >
            <div className="mt-4 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-zinc-600">
                {isTrue ? "Benar" : "Salah"}
              </h2>
              <p className="text-sm text-gray-500 max-w-[60%] text-center">
                {isTrue
                  ? "Kode verifikasi yang anda masukkan benar"
                  : "Kode verifikasi yang anda masukkan salah"}
              </p>
            </div>
          </Modal>
        </div>
      </div>

      {/* <Transition appear show={isOpen} as={Fragment}>
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
                      src={isTrue ? `/success.svg` : `/failed.svg`}
                      alt={isTrue ? "success" : "failed"}
                      width={120}
                      height={120}
                      className="mx-auto"
                    />
                  </Dialog.Title>
                  
                  <Button className="mt-4"
                    onClick={isTrue ? () => {
                      closeModal();
                      router.push("/auth/reset-password");
                    } : handleWrongCode}
                  >   
                      {isTrue ? "Buat Password Baru" : "Ketik Ulang"}
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> */}
    </>
  );
}
