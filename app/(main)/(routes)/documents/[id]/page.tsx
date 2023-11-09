"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Cover } from "@/components/Cover";
import Toolbar from "@/components/Toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery } from "convex/react";

export default function DocumentPage({
  params,
}: {
  params: { id: Id<"documents"> };
}) {
  const { id } = params;

  const document = useQuery(api.documents.getDocumentById, { id });

  const updateDocument = useMutation(api.documents.updateDocument);

  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor"), { ssr: false }),
    []
  );

  const onChange = (content: string) => {
    updateDocument({
      id,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />

        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />

            <Skeleton className="h-4 w-[80%]" />

            <Skeleton className="h-4 w-[40%]" />

            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />

      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />

        <Editor initialContent={document.content} onChange={onChange} />
      </div>
    </div>
  );
}
