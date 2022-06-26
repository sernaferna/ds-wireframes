import React from 'react';
import { SectionDocumentation } from './TutorialTypes';
import { RenderedSection } from './RenderedSection';

interface ITutorial {
  sections: SectionDocumentation[];
}
export const Tutorial = ({ sections }: ITutorial) => {
  return (
    <>
      {sections.map((section) => (
        <RenderedSection section={section} />
      ))}
    </>
  );
};
