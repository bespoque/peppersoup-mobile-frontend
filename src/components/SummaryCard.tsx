import { FC } from "react";
import Image from "next/image";

interface CardProps {
  iconSrc: string;
  title: string;
  value: string | number;
  subtitle: string;
  buttonText: string;
}

const Products: FC<CardProps> = ({
  iconSrc,
  title,
  value,
  subtitle,
  buttonText,
}) => {
  return (
<div className="flex flex-col items-start justify-start p-4 bg-white border rounded-lg shadow-md w-full sm:w-72">
  <div className="flex self-end items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
    <Image src={iconSrc} alt={title} width={24} height={24} />
  </div>
  <div className="flex flex-col">
    <h3 className="text-3xl font-bold">{value}</h3>
    <p className="font-bold">{title}</p>
  </div>
  <p className="text-xs mt-2">{subtitle}</p>

  <button className="mt-4 px-4 py-2 text-sm font-medium  rounded hover:bg-blue-200">
    {buttonText}
  </button>
</div>

  );
};

export default Products;
