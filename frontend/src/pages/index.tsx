import { useEffect } from "react";
import { NextRouter, useRouter } from "next/router";

const Index = () => {
  const router: NextRouter = useRouter();

  useEffect(() => {
    router.replace("/home");
  }, []);

  return null;
};

export default Index;
