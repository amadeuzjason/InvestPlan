import GuidePage from "@/app/components/guide/guidePage";

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GuidePage />
      {children}
    </>
  );
}