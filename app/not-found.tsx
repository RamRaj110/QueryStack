import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constant/route";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4">
      <Image
        src="/somethingWrongImage.png"
        alt="Page not found"
        width={300}
        height={220}
        className="object-contain"
        priority
      />

      <h1 className="mt-8 text-3xl font-bold text-foreground">
        Page Not Found
      </h1>

      <p className="mt-4 max-w-md text-center text-muted-foreground">
        Oops! The page you&apos;re looking for doesn&apos;t exist. It might have
        been moved or deleted.
      </p>

      <Link href={ROUTES.HOME}>
        <Button
          size="lg"
          className="mt-8 min-h-[46px] bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"
        >
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
