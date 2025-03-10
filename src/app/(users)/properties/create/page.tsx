import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import CreateForm from "./create-form";
import CenteredLayout from "@/components/custom/containers/centered-layout";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Create Property`,
};

export default function Page() {
  return (
    <CenteredLayout className="sm:pt-8 pb-8 px-2">
      <h2 className="scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0">
        Create a new property
      </h2>

      <Separator className="my-4 bg-zinc-50" />

      <CreateForm />
    </CenteredLayout>
  );
}
