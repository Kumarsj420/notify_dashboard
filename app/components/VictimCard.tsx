import React from "react";
import { cn } from "../utils/style";
import { BriefcaseIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";

interface RecentVictim {
  name: string;
  flag: string;
  group: string;
  description: string;
  activity: string;
  attackDate: string;
}

interface VictimCardProps {
  victim: RecentVictim;
  className?: string;
  groupVariant?: "danger" | "warning" | "info";
}

const VictimCard: React.FC<VictimCardProps> = ({
  victim,
  className,
  groupVariant = "danger",
}) => {
  const groupVariants = {
    danger:
      "bg-red-50 text-red-600 ring-red-200",
    warning:
      "bg-amber-50 text-amber-600 ring-amber-200",
    info:
      "bg-sky-50 text-sky-600 ring-sky-200",
  };

  return (
    <div
      className={cn(
        "bg-linear-to-b from-white to-sc-50 rounded-3xl ring-1 ring-inset ring-sc-200 p-6 shadow-lg shadow-sc-300/60 hover:shadow-xl transition-all duration-200",
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-sc-900 leading-tight mb-1">
            {victim.name}
          </h3>
        </div>
        <span className="text-3xl">{victim.flag}</span>
      </div>

      {/* Group Badge */}
      <span
        className={cn(
          "px-2.5 py-1 text-xs font-semibold rounded-lg ring-1 ring-inset inline-block capitalize mb-3",
          groupVariants[groupVariant]
        )}
      >
        {victim.group}
      </span>

      {/* Description */}
      <p className="text-sm font-light text-sc-600/90 mb-4 line-clamp-3">
        {victim.description}
      </p>

      {/* Meta Section */}
      <div className="text-xs text-sc-600/90 space-y-2">
        <p className="flex items-center gap-2">
          <BriefcaseIcon className="size-4 text-sc-500/80" />
          <span className="font-medium text-sc-700">Activity:</span>
          {victim.activity}
        </p>

        <p className="flex items-center gap-2">
          <CalendarDaysIcon className="size-4 text-sc-500/80" />
          <span className="font-medium text-sc-700">Attack Date:</span>
          {victim.attackDate}
        </p>
      </div>
    </div>
  );
};

export default VictimCard;
