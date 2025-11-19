"use client";

import React from "react";
import { MapPin, Pencil, Eye, Siren, ShieldAlert, Phone, Mail, AlertTriangle } from 'lucide-react';
import Button from "./Button";
import Badge from "./Badge"

import { PencilSquareIcon, EyeIcon } from "@heroicons/react/24/solid";
import { BellIcon } from "@heroicons/react/24/outline";

interface ExposureEvent {
  profile: string;
  id: string;
  name: string;
  designation: string;
  description: string;
  location: string;
  number: number;
  email: string;
  type: string | null;
}

interface Props {
  data: ExposureEvent;
  onView: (employee: ExposureEvent) => void;
  onEdit: (employee: ExposureEvent) => void;
  onAlert: (employee: ExposureEvent) => void;
}

const ContactCard: React.FC<Props> = ({ data, onView, onEdit, onAlert }) => {
  return (
    <div className="w-full mx-auto space-y-8 px-8 py-7 transition border-b border-b-sc-200 odd:bg-sc-50">
      <div className="flex items-center justify-between">
        {/* Profile & Details */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={data.profile}
              alt={data.name}
              className="size-11 rounded-full object-cover ring-[0.1em] ring-sc-300/80 ring-offset-3"
            />

              {data.type === 'critical' && (
                <Badge size="auto" variant="error" className="absolute -top-5 -right-3 size-7">
                  <ShieldAlert className="size-4 text-red-600" />
                </Badge>
              )}

              {data.type === 'medium' && (
                <Badge size="auto" variant="warning" className="absolute -top-5 -right-3 size-7">
                  <AlertTriangle className="size-4 text-amber-600" />
                </Badge>
              )}

            </div>

            <div>
              <div className="flex flex-row gap-3 items-center">
                <h2 className="text-lg/8 font-bold text-sc-900 ">
                  {data.name}</h2>
                {data.type === 'critical' && (
                  <div className=" flex flex-row gap-2 items-center">
                    <Badge variant="error">
                      <ShieldAlert className="size-3.5" />
                      Critical
                    </Badge>
                    <Badge variant="secondary">
                      8 Exposure
                    </Badge>
                  </div>
                )}
                {data.type === 'medium' && (
                  <div className="flex flex-row gap-2 items-center">
                    <Badge variant="warning">
                      <AlertTriangle className="size-3.5" />
                      Medium
                    </Badge>
                    <Badge variant="secondary">
                      8 Exposure
                    </Badge>
                  </div>
                )}

              </div>

            <p className="font-semibold text-sc-700 text-sm">{data.designation}</p>
            <p className="font-light text-sc-600/90 text-sm">{data.description}</p>

            {/* Contact Info */}
            <div className="flex flex-row gap-4 mt-1">
              <div className="flex items-center gap-1.5 font-light text-sc-600/90 text-sm">
                <MapPin width={16} />
                {data.location}
              </div>
              <div className="flex items-center gap-1.5 font-light text-sc-600/90 text-sm">
                <Phone width={16} />
                {data.number}
              </div>
              <div className="flex items-center gap-1.5 font-light text-sc-600/90 text-sm">
                <Mail width={16} />
                {data.email}
              </div>
            </div>
          </div>
        </div>


          <div className="flex items-center gap-3">
            <Button variant="outline" size='sm' onClick={() => onView(data)}>
              <EyeIcon className="size-4 text-sc-500/80 scale-95" /> View
            </Button>

            <Button variant="outline" size='sm' onClick={() => onEdit(data)}>
              <PencilSquareIcon className="size-4 text-sc-500/80 scale-95" /> Edit
            </Button>

            <Button variant="primary" size="sm" onClick={() => onAlert(data)}>
              <BellIcon className="scale-105 size-4" strokeWidth={1.8} /> Alert
            </Button>

          </div>
        </div>
      </div>

);
};

export default ContactCard;
