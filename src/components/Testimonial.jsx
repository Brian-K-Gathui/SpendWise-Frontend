import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Testimonial = () => {
  return (
    <div className="w-full bg-background text-foreground py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row bg-card rounded-lg overflow-hidden shadow-md border border-border">
          {/* Video Placeholder */}
          <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto bg-primary flex items-center justify-center">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full h-12 w-12"
            >
              <Play className="h-5 w-5" />
              <span className="sr-only">Play video</span>
            </Button>
          </div>

          {/* Testimonial Content */}
          <div className="w-full md:w-1/2 p-6 md:p-8">
            <div className="flex text-primary">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <span key={i}>★</span>
                ))}
            </div>
            <p className="mt-4 text-lg font-medium">
              "SpendWise has transformed the way I manage my expenses. I now
              have complete control and clarity over my finances!"
            </p>
            <p className="mt-6 font-semibold">Emily Johnson</p>
            <p className="text-muted-foreground">Finance Manager, ABC Corp</p>

            {/* Logo Placeholder */}
            <div className="mt-6 flex items-center">
              <div className="h-6 border-r border-border pr-4"></div>
              <span className="ml-4 text-lg font-semibold">Webflow</span>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center mt-8 gap-4">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-10 w-10"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous testimonial</span>
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-10 w-10"
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next testimonial</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
