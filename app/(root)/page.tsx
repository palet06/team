import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();
  console.log(session);
  return (
    <>
      <h1 className="">Hayır</h1>
      <h1 className="font-space-grotesk">Hayır</h1>
    </>
  );
};
export default Home;
