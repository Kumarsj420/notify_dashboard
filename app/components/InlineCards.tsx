import { userAgent } from "next/server";
import React from "react";

interface InlineCardProps {
  upperTitle: string;
  mainTitle: string;
  bottomTitle?: string;
  icon?: React.ReactNode;
  color?: string;
  bottomColor?: string;
}

const InlineCard: React.FC<InlineCardProps> = ({
  upperTitle,
  mainTitle,
  bottomTitle,
  icon,
  color = "bg-gray-100",
  bottomColor = "text-gray-500",
}) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-100 p-5 w-full hover:shadow-md transition-all duration-300">
      <div>
        <p className="text-sm text-gray-500">{upperTitle}</p>
        <h2 className="text-2xl font-semibold mt-1">{mainTitle}</h2>
        {bottomTitle && (
          <p className={`text-sm mt-1 ${bottomColor}`}>{bottomTitle}</p>
        )}
      </div>

      {icon && (
        <div
          className={`${color} p-3 rounded-xl flex items-center justify-center`}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export default InlineCard;



// usage 

//     const cardData = [
//     {
//       upperTitle: "Total Exposures",
//       mainTitle: "1,247",
//       bottomTitle: "⚠️",
//       icon: <AlertTriangle className="text-red-600 w-5 h-5" />,
//       color: "bg-red-100",
//     },
//     {
//       upperTitle: "New This Week",
//       mainTitle: "+23",
//       bottomTitle: "↑ 12% increase",
//       bottomColor: "text-red-500",
//       icon: <TrendingUp className="text-orange-500 w-5 h-5" />,
//       color: "bg-orange-100",
//     },
//     {
//       upperTitle: "Most Exposed",
//       mainTitle: "company.com",
//       bottomTitle: "342 exposures",
//       icon: <Globe className="text-blue-600 w-5 h-5" />,
//       color: "bg-blue-100",
//     },
//     {
//       upperTitle: "Resolved",
//       mainTitle: "89.2%",
//       bottomTitle: "↑ 5% improvement",
//       bottomColor: "text-green-600",
//       icon: <CheckCircle className="text-green-600 w-5 h-5" />,
//       color: "bg-green-100",
//     },
//   ];
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-red-200">
//               {cardData.map((card, index) => (
//                 <InlineCard
//                   key={index}
//                   upperTitle={card.upperTitle}
//                   mainTitle={card.mainTitle}
//                   bottomTitle={card.bottomTitle}
//                   bottomColor={card.bottomColor}
//                   icon={card.icon}
//                   color={card.color}
//                   />
//                 ))}
//               </div>