import { useEffect } from 'react';
import { useRouter } from 'next/router';


const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/croupier-interface');
  }, []);

  return null;
};

export default Index;
