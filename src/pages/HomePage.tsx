import { Hero } from '../components/sections/Hero';
import { ProofBar } from '../components/sections/ProofBar';
import { SelectedWork } from '../components/sections/SelectedWork';
import { HowIWork } from '../components/sections/HowIWork';
import { CompactStack } from '../components/sections/CompactStack';
import { ContactStrip } from '../components/sections/ContactStrip';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <ProofBar />
      <SelectedWork />
      <HowIWork />
      <CompactStack />
      <ContactStrip />
    </>
  );
};
