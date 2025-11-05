"use client";

import { useState } from "react";
import Title from "../components/Title";
import Intro from "../components/Intro";
import InlineCard from "../components/InlineCards";
import ExposoreSearch from "../components/ExposoreSearch";

import {
  AlertTriangle,
  TrendingUp,
  Globe,
  CheckCircle,
} from 'lucide-react'

export default function Resume() {

  const cardData = [
    {
      upperTitle: "Total Exposures",
      mainTitle: "1,247",
      bottomTitle: "surfing on web",
      icon: <AlertTriangle className="text-red-600 w-5 h-5" />,
      color: "bg-red-100",
    },
    {
      upperTitle: "New This Week",
      mainTitle: "+23",
      bottomTitle: "↑ 12% increase",
      bottomColor: "text-red-500",
      icon: <TrendingUp className="text-orange-500 w-5 h-5" />,
      color: "bg-orange-100",
    },
    {
      upperTitle: "Most Exposed",
      mainTitle: "company.com",
      bottomTitle: "342 exposures",
      icon: <Globe className="text-blue-600 w-5 h-5" />,
      color: "bg-blue-100",
    },
    {
      upperTitle: "Resolved",
      mainTitle: "89.2%",
      bottomTitle: "↑ 5% improvement",
      bottomColor: "text-green-600",
      icon: <CheckCircle className="text-green-600 w-5 h-5" />,
      color: "bg-green-100",
    },
  ];

  return (
    <>
    <Title>Domain exposore</Title>
    <Intro>Hii this is another intro where we will show you your domain exposore risks.</Intro>


    <div className="mt-15">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {cardData.map((card, index) => (
                <InlineCard
                  key={index}
                  upperTitle={card.upperTitle}
                  mainTitle={card.mainTitle}
                  bottomTitle={card.bottomTitle}
                  bottomColor={card.bottomColor}
                  icon={card.icon}
                  color={card.color}
                  />
                ))}
              </div>
    </div>


    <ExposoreSearch />
    </>
  );
}
