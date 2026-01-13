"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import the Editor component, disabling SSR
const Editor = dynamic(() => import("./MDXeditor"), {
  ssr: false,
  loading: () => (
    // Fallback UI while the editor loads
    <div className="flex flex-col gap-2">
       <Skeleton className="h-10 w-full bg-secondary/30" />
       <Skeleton className="h-[300px] w-full bg-secondary/30" />
    </div>
  ),
});

export default Editor;