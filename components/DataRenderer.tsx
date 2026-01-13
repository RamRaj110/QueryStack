import { DEFAULT_EMPTY, EMPTY_QUESTION, DEFAULT_ERROR } from "@/constant/state";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface Props<T> {
  success: boolean;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  data: T[] | null | undefined;
  empty?: {
    title: string;
    message: string;
    button?: {
      text: string;
      href: string;
    };
  };
  render: (data: T[]) => React.ReactNode;
}

interface StateSkeletonProps {
  image: {
    light: string;
    dark: string;
    alt: string;
  };
  title: string;
  message: string;
  button?: {
    text: string;
    href: string;
  };
}

const StateSkeleton = ({
  image,
  title,
  message,
  button,
}: StateSkeletonProps) => (
  <div className="mt-16 flex w-full flex-col items-center justify-center sm:mt-20">
    <>
      <Image
        src={image.dark}
        alt={image.alt}
        width={270}
        height={200}
        className="hidden object-contain dark:block"
      />
      <Image
        src={image.light}
        alt={image.alt}
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
    </>

    <h2 className="h2-bold text-foreground mt-8 text-xl font-bold">{title}</h2>

    <p className="body-regular text-muted-foreground my-3.5 max-w-md text-center">
      {message}
    </p>

    {button && (
      <Link href={button.href}>
        <Button
          size="lg"
          className="mt-4 min-h-[46px] px-4 py-3 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {button.text}
        </Button>
      </Link>
    )}
  </div>
);

const DataRenderer = <T,>({
  success,
  error,
  data,
  empty = EMPTY_QUESTION,
  render,
}: Props<T>) => {
  // 1. Handle Error State
  if (!success) {
    return (
      <StateSkeleton
        image={{
          light: "/somethingWrongImage.png",
          dark: "/somethingWrongImage.png",
          alt: "Error state illustration",
        }}
        title={error?.message || DEFAULT_ERROR.title}
        message={
          error?.details
            ? JSON.stringify(error.details, null, 2)
            : DEFAULT_ERROR.message
        }
        button={DEFAULT_ERROR.button}
      />
    );
  }
  if (!data || data.length === 0)
    return (
      <StateSkeleton
        image={{
          light: "/empty_error_image.png",
          dark: "/empty_error_image.png",
          alt: "Empty state illustration",
        }}
        title={empty.title}
        message={empty.message}
        button={empty.button}
      />
    );
  return render(data);
};

export default DataRenderer;
