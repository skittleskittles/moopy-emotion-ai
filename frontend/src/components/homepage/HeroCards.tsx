import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const HeroCards = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-full h-full flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-0 flex justify-center items-center pb-0 w-full">
          <img
            src="https://scholarlykitchen.sspnet.org/wp-content/uploads/2023/09/iStock-1479494606.jpg"
            alt="Half Page Image"
            className="w-full h-[75%] object-cover" // Make the image take up 75% of the height of the right half
          />
          <CardTitle className="text-center"></CardTitle> {/* Optional title */}
        </CardHeader>
      </Card>
    </div>
  );
};
