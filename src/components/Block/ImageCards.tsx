// components/ImageCards.tsx
import { Card, CardContent } from "@/components/UI/card";
import Image from "next/image";

const cards = [
  {
    title: "Best Sellers",
    bgColor: "transparent",
    image: "/images/products/prod_kf56arWI.webp",
  },
  {
    title: "Gifts of Love",
    bgColor: "transparent",
    image: "/images/products/prod_PlTU06fM.webp",
  },
  {
    title: "New In",
    bgColor: "transparent",
    image: "/images/products/prod_rRXkj2e0.webp",
  },
];

export function ImageCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-8">
      {cards.map((card) => (
        <Card
          key={card.title}
          className={`${card.bgColor} overflow-hidden cursor-pointer transition-transform transform hover:scale-105`}
        >
          <div className="relative w-full h-96">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="text-center py-4">
            <h3 className="text-lg font-semibold">{card.title}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
