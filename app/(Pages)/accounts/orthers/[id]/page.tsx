
import DetailsOrderItem from "@/app/Components/DetailsOrderItem";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};
async function page({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <DetailsOrderItem id={Number(id)} />
    </>
  );
}

export default page;
