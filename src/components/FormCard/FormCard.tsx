import type { ElementType, ReactNode } from "react";

interface Props {
  title: string;
  subTitle?: string;
  children: ReactNode;
  icon?: ElementType;
}

export const FormCard = ({ title, subTitle, children, icon: Icon }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30 flex items-start gap-4">
        {Icon && (
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
            <Icon size={20} />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
          {subTitle && <p className="mt-1 text-sm text-gray-500">{subTitle}</p>}
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-6">{children}</div>
    </div>
  );
};
