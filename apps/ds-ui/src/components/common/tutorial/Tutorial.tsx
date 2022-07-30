import React from 'react';
import { SectionDocumentation } from '@devouringscripture/common';
import { RenderedSection } from './RenderedSection';

interface ITutorial {
  sections: SectionDocumentation[];
}

/**
 * Renders a tutorial, including its section titles, sub-parts (in an Accordion),
 * and text/example parts.
 *
 * @param sections The list of SectionDocumentation objects to be rendered
 */
export const Tutorial = ({ sections }: ITutorial) => {
  return (
    <>
      {sections.map((section, index) => (
        <RenderedSection section={section} key={`rendered-section-${index}`} />
      ))}
    </>
  );
};
