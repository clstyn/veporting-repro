"use client";

import Image from "next/image";
import Button from "@/app/ui/auth/button";
import Link from "next/link";
import { useState } from "react";

export default function ResetPassword() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {}
  return (
    <>
      <div className="p-6">
        <div className="flex flex-col items-center">
          <Image src={`/key.svg`} alt="key" width={120} height={120} />
          <h2 className={`font-bold text-zinc-600 text-2xl text-center mt-4`}>
            Masukkan Password
          </h2>
          <p className="px-4 text-center max-w-[70%] text-wrap">
            Masukkan password baru anda
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="mt-4">
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="font-medium font-[#535353] mb-2"
              >
                Password Baru
              </label>
              <input
                type="password"
                name="password"
                className="bg-[#F6F6F6] border border-[#BFBFBF] rounded-md h-12 focus:outline-none px-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="font-medium font-[#535353] mb-2"
              >
                Re-enter New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="bg-[#F6F6F6] border border-[#BFBFBF] rounded-md h-12 focus:outline-none px-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <Button type="submit">Buat Password</Button>
          </div>
        </form>

        {error && <div className="text-red-900 font-bold">{error}</div>}

      </div>
    </>
  );
}
