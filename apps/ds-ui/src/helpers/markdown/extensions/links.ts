import { marked } from 'marked';

export const linksInNewWindow: Partial<Omit<marked.Renderer<false>, 'options'>> = {
  link(href, title, text) {
    return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
  },
};
