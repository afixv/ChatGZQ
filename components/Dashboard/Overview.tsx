"use client";

import { Button } from "../Button";
import { useState } from "react";
import Modal from "../Modal";
import Form from "./Form";
import { FaUserAlt, FaWeight } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";
import IconWrapper from "./IconWrapper";
import { TbTriangleFilled } from "react-icons/tb";
import StatusLabel from "./StatusLabel";

export default function Overview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const data = [
    {
      title: "Laki - Laki",
      icon: FaUserAlt,
      value: "6 Bulan",
    },
    {
      title: "Berat Badan",
      icon: FaWeight,
      value: "5.2 Kg",
      history: -0.5,
    },
    {
      title: "Tinggi Badan",
      icon: GiBodyHeight,
      value: "60 cm",
      history: +0.5,
    },
  ];

  return (
    <section>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-dark-30">Halo, John Doe!</h1>
          <p className="mt-1 max-w-xl font-medium text-dark-80">
            Terus pantau perkembangan anak Anda di Dashboard ya! Jangan Lupa
            tambahkan data di sini setiap menimbang!
          </p>
        </div>
        <Button
          variant="primary"
          className="py-3 text-white"
          onClick={handleOpenModal}
        >
          Isi Data Periodik
        </Button>

        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <Form />
          </Modal>
        )}
      </div>
      <div className="mt-4 flex flex-col flex-wrap gap-8 md:flex-row">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <IconWrapper>
              <item.icon />
            </IconWrapper>
            <div>
              <span className="m-0 text-sm font-medium text-light-70">
                {item.title}
              </span>
              <span className="flex items-center gap-2">
                <h2 className="-mt-1 text-lg font-bold">{item.value}</h2>
                {item.history !== undefined && (
                  <span className="flex items-center gap-1 text-xs font-medium">
                    <TbTriangleFilled
                      className={` ${
                        item.history > 0
                          ? "text-primary-60"
                          : "rotate-180 transform text-danger-70"
                      }`}
                    />
                    <span
                      className={`font-bold ${
                        item.history > 0 ? "text-primary-60" : "text-danger-70"
                      }`}
                    >
                      {item.history}
                    </span>
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="relative mt-4 flex flex-wrap items-center gap-6 md:gap-12">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold">BB/U: </span>
          <StatusLabel />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold">BB/TB: </span>
          <StatusLabel status="berlebih" />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold">TB/U: </span>
          <StatusLabel status="baik" />
        </div>
        <div className="left-0 top-1/2 -z-10 h-[0.5px] w-full -translate-y-1/2 transform bg-light-20 md:absolute"></div>
      </div>
    </section>
  );
}
