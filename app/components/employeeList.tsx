"use client";

import React from "react";
import { MapPin, Pencil, Eye, Siren, ShieldAlert, Phone, Mail, AlertTriangle } from 'lucide-react';


interface ExposureEvent {
  profile: string;
  id: string;
  name: string;
  designation: string;
  description: string;
  location: string;
  number: number;
  email: string;
  type: string | null
}

interface Props {
  data: ExposureEvent;
  onView: (employee: ExposureEvent) => void;
  onEdit: (employee: ExposureEvent) => void;
}

const ContactCard: React.FC<Props> = ({ data, onView, onEdit }) => {

  return (
    <>
      <div className="w-full mx-auto space-y-8 px-8 py-7 transition border-b border-b-sc-200 odd:bg-sc-50">

        <div className="flex items-center justify-between ">


          <div className="flex items-start gap-4  ">
            <div className="relative">
              <img
                src={data.profile}
                alt={data.name}
                className="size-11 rounded-full object-cover ring-[0.1em] ring-sc-300/80 ring-offset-3"
              />

              {data.type === 'critical' && (
                <div className="absolute -top-5 -right-3 size-7 rounded-full bg-linear-to-b from-red-50 to-red-100 ring-1 ring-inset ring-red-200 flex items-center justify-center ">
                  <ShieldAlert className="size-4 text-red-600" />
                </div>
              )}

              {data.type === 'medium' && (
                <div className="absolute -top-5 -right-3 size-7 rounded-full bg-linear-to-b from-amber-50 to-amber-100 ring-1 ring-inset ring-amber-200 flex items-center justify-center">
                  <AlertTriangle className="size-4 text-amber-600" />
                </div>
              )}

            </div>

            <div>
              <div className="flex flex-row gap-3 items-center">
                <h2 className="text-lg/8 font-bold text-sc-900 ">
                  {data.name}</h2>
                {data.type === 'critical' && (
                  <div className=" flex flex-row gap-2 items-center">
                    <span className=" ring-1 ring-inset ring-red-200 px-3 py-1 bg-linear-to-b from-red-50 to-red-100 rounded-xl flex flex-row justify-center items-center gap-2 text-xs font-semibold text-red-600">
                      <ShieldAlert className="size-3.5" />
                      Critical
                    </span>
                    <span className=" ring-1 ring-inset ring-sc-300/80 px-3 py-1 bg-linear-to-b from-sc-50 to-sc-100 rounded-xl flex flex-row justify-center items-center gap-2 text-xs font-semibold text-sc-600/90">
                      8 Exposure
                    </span>
                  </div>
                )}
                {data.type === 'medium' && (
                  <div className="flex flex-row gap-2 items-center">
                    <span className="ring-1 ring-inset ring-amber-200 px-3 py-1 bg-linear-to-b from-amber-50 to-amber-100 rounded-xl flex flex-row justify-center items-center gap-2 text-xs font-semibold text-amber-600">
                      <AlertTriangle className="size-3.5" />
                      Medium
                    </span>
                    <span className=" ring-1 ring-inset ring-sc-300/80 px-3 py-1 bg-linear-to-b from-sc-50 to-sc-100 rounded-xl flex flex-row justify-center items-center gap-2 text-xs font-semibold text-sc-600/90">
                      8 Exposure
                    </span>
                  </div>
                )}

              </div>

              <p className="font-semibold text-sc-700 text-sm/6">{data.designation}</p>
              <p className="font-light text-sc-600/90 text-sm/5">{data.description}</p>

              <div className="flex flex-row gap-4">
                <div className="flex items-center gap-1.5 mt-1 font-light text-sc-600/90 text-sm/6">
                  <MapPin width={16} />
                  {data.location}
                </div>
                <div className="flex items-center gap-1.5 mt-1 font-light text-sc-600/90 text-sm/6">
                  <Phone width={16} />
                  {data.number}
                </div>
                <div className="flex items-center gap-1.5 mt-1 font-light text-sc-600/90 text-sm/5">
                  <Mail width={16} />
                  {data.email}
                </div>
              </div>
            </div>
          </div>


          <div className="flex items-center gap-3">

            <button onClick={() => onView(data)} className="bg-white hover:bg-sc-50 text-sc-500 rounded-xl px-3 py-2 text-sm flex items-center gap-2 font-medium shadow-md shadow-gray-200 transition cursor-pointer popup-trigger ring-1 ring-inset ring-sc-300 hover:ring-sc-400/80" data-popup="addEmployee">
              <Eye size={16} /> View
            </button>

            <button onClick={() => onEdit(data)} className="bg-white hover:bg-sc-50 text-sc-500 rounded-xl px-3 py-2 text-sm flex items-center gap-2 font-medium shadow-md shadow-gray-200 transition cursor-pointer popup-trigger ring-1 ring-inset ring-sc-300 hover:ring-sc-400/80" data-popup="addEmployee">
              <Pencil size={16} className="scale-85" /> Edit
            </button>


            <button className="bg-p-500 hover:bg-p-400 text-white rounded-xl px-3 py-2 text-sm flex items-center gap-2 font-medium shadow-md hover:shadow-lg transition cursor-pointer popup-trigger" data-popup="alertPopup">
              <Siren size={16} className="scale-105" /> Alert
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCard;
