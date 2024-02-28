import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@/app/ui/auth/button";

const DeletePopup = ({ isDeleteOpen, idData, onClose }) => {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/report/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Transition appear show={isDeleteOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                  <h2 className="text-2xl font-bold text-zinc-600">
                    Konfirmasi Hapus
                  </h2>
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-lg text-gray-500">
                    Apakah Anda yakin ingin menghapus laporan ini?
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => {
                      handleDelete(idData);
                    }}
                  >
                    Ya
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeletePopup;
