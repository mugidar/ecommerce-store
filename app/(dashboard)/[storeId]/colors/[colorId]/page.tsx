import prismadb from "@/lib/prismadb";
import ColorForm from "../components/color-form";

const ColorPage = async ({
  params,
}: {
  params: {
    colorId: string
  };
}) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });


  return (
    <div>
      <ColorForm initialData={color} />
    </div>
  );
};

export default ColorPage;
