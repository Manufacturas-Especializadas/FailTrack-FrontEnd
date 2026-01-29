import React from "react";
import { type LucideIcon, ArrowUpRight } from "lucide-react";

interface NavCardProps {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  variant?: "blue" | "orange";
}

export const NavCard: React.FC<NavCardProps> = ({
  title,
  description,
  path,
  icon: Icon,
  variant = "blue",
}) => {
  const styles = {
    blue: {
      hoverBorder: "hover:border-blue-500",
      iconBg: "bg-blue-50 group-hover:bg-blue-600",
      iconColor: "text-blue-600 group-hover:text-white",
      title: "group-hover:text-blue-700",
      shadow: "hover:shadow-blue-100",
    },
    orange: {
      hoverBorder: "hover:border-orange-500",
      iconBg: "bg-orange-50 group-hover:bg-orange-600",
      iconColor: "text-orange-600 group-hover:text-white",
      title: "group-hover:text-orange-700",
      shadow: "hover:shadow-orange-100",
    },
  };

  const activeStyle = styles[variant];

  return (
    <a
      href={path}
      className={`
        group relative flex flex-col items-center justify-center text-center
        h-64 w-full md:aspect-square p-8 rounded-3xl
        bg-white border-2 border-transparent
        shadow-sm transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-2xl ${activeStyle.shadow}
        ${activeStyle.hoverBorder}
      `}
    >
      <div
        className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 
        transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0"
      >
        <ArrowUpRight size={20} className="text-gray-400" />
      </div>

      <div
        className={`
          mb-6 p-5 rounded-2xl transition-all duration-300 
          transform group-hover:scale-110 group-hover:rotate-3
          ${activeStyle.iconBg} ${activeStyle.iconColor}
        `}
      >
        <Icon size={48} strokeWidth={1.5} />
      </div>

      <div>
        <h3
          className={`text-2xl font-bold text-gray-800 mb-3 transition-colors ${activeStyle.title}`}
        >
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-62.5 mx-auto">
          {description}
        </p>
      </div>
    </a>
  );
};
