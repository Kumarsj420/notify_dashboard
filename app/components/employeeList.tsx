"use client";

import React from "react";
import { MapPin, Pencil, Eye, Siren } from 'lucide-react';


interface ExposureEvent {
  profile: string;
  id: string;
  name: string;
  designation: string;
  description: string;
  location: string;
}

interface Props {
  data: ExposureEvent;
}

const ContactCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full mx-auto space-y-8 px-6 py-4 transition">

      <div className="flex items-center justify-between">


        <div className="flex items-start gap-4">
          <img
            src={data.profile}
            alt={data.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-orange-300"
          />

          <div>
            <h2 className="text-xl font-bold text-sc-900">{data.name}</h2>

            <p className="font-medium text-sc-700 text-xs">{data.designation}</p>
            <p className="font-medium text-sc-500 text-xs">{data.description}</p>

            <div className="flex items-center gap-2 mt-1 text-sc-500 text-xs">
              <MapPin width={12} />
              {data.location}
            </div>
          </div>
        </div>


        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 rounded-lg text-sc-700 bg-sc-200 transition flex items-center justify-center gap-1 text-sm cursor-pointer">
              <Eye width={14} />
              <span>View</span>
            
          </button>

          <button className="px-3 py-1.5 rounded-lg text-emerald-700 bg-emerald-200 transition flex items-center justify-center gap-1 text-sm cursor-pointer">
            <Pencil width={12} />
            <span>Edit</span>
          </button>

          <button className="px-3 py-1.5 rounded-lg text-red-700 bg-red-200 transition flex items-center justify-center gap-1 text-sm cursor-pointer">
            <Siren width={16} />
            <span>Alert</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
