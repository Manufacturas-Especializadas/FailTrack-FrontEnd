import React from "react";
import { type LucideIcon, ExternalLink } from "lucide-react";

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
      bg: "bg-white hover:border-blue-500/30",
      iconContainer:
        "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
      title: "group-hover:text-blue-700",
    },
    orange: {
      bg: "bg-white hover:border-orange-500/30",
      iconContainer:
        "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
      title: "group-hover:text-orange-700",
    },
  };

  const activeStyle = styles[variant];

  return (
    <a
      href={path}
      rel="noopener noreferrer"
      className={`
        group relative flex flex-col p-6 rounded-2xl
        border border-gray-200 shadow-sm
        transition-all duration-300 ease-out
        hover:shadow-xl hover:-translate-y-1
        ${activeStyle.bg}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-3 rounded-xl transition-all duration-300 ${activeStyle.iconContainer}`}
        >
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <ExternalLink
          size={18}
          className="text-gray-300 group-hover:text-gray-500 transition-colors"
        />
      </div>

      <div className="mt-2">
        <h3
          className={`text-xl font-bold text-gray-800 mb-2 transition-colors ${activeStyle.title}`}
        >
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </a>
  );
};
