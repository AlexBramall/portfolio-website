import { Hero } from '../components/sections/Hero';
import { ProofBar } from '../components/sections/ProofBar';
import { SelectedWork } from '../components/sections/SelectedWork';
import { HowIWork } from '../components/sections/HowIWork';
import { CompactStack } from '../components/sections/CompactStack';
import { HireCta } from '../components/sections/HireCta';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <ProofBar />
      <SelectedWork />
      <HowIWork />
      <CompactStack />
      <HireCta />
    </>
  );
};
