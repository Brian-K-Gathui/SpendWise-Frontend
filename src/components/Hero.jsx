import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="min-h-screen bg-white px-4 py-12 md:px-6 lg:px-8 text-[#092C4C]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* ------Left Column --------- */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Take Control of Your Spending with SpendWise
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              SpendWise empowers you to effortlessly track your expenses and
              manage your budgets. With our intuitive platform, gain insights
              into your financial habits and make informed decisions for a
              brighter financial future.
            </p>
            <div className="flex gap-4">
              <Button
                className="bg-black text-white hover:bg-black/90"
                size="lg"
              >
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right ------ - Image Grid---- */}
          <div className="grid grid-cols-8 grid-rows-6 gap-4">
            {/* Top  */}
            <div className="col-span-3 row-span-2">
              <img
                src="https://placehold.co/600x400"
                alt="Money jar"
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div className="col-span-5 row-span-2">
              <img
                src="https://placehold.co/600x400"
                alt="Coins spilling"
                className="h-full w-full rounded-lg object-cover"
              />
            </div>

            {/* chini*/}
            <div className="col-span-5 row-span-4">
              <img
                src="https://placehold.co/600x400"
                alt="Dollar bills"
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div className="col-span-3 row-span-4 flex flex-col gap-4">
              <div className="h-1/2">
                <img
                  src="https://placehold.co/600x400"
                  alt="Credit card transaction"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="h-1/2">
                <img
                  src="https://placehold.co/600x400"
                  alt="Money counting"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
