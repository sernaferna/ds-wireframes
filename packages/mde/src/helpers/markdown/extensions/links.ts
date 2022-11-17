import { marked } from 'marked';

/**
 * Simply makes all links open in a new window
 */
export const LinksInNewWindow: Partial<Omit<marked.Renderer<false>, 'options'>> = {
  link(href, title, text) {
    return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
  },
};
