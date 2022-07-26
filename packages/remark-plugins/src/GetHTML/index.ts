import { unified } from 'unified';
import markdown from 'remark-parse';
import html from 'rehype-stringify';
import remark2Rehype from 'remark-rehype';
import supersub from 'remark-supersub';
import gfm from 'remark-gfm';
import { tac } from '../tac';
import { lowerCaps } from '../lower-caps';
import { smallCaps } from '../small-caps';
import { bibleLinks } from '../bible-links';
import { highlight } from '../highlight';
import { smartquotes } from '../smartquotes';
import { scriptureQuotes } from '../scripture-quotes';

/**
 * Helper function to get a properly ordered list of Remark Plugins, for use in converting markdown to HTML.
 *
 * @returns List of plugins to be used in rendering markdown to HTML
 */
export const getPluginList = () => {
  return [scriptureQuotes, tac, lowerCaps, smallCaps, bibleLinks, highlight, supersub, smartquotes];
};

/**
 * Takes in markdown text and returns HTML
 *
 * @param inputMD The markdown text
 * @returns The formatted HTML
 */
export const getHTMLForMD = (inputMD: string): string => {
  const resultHTML = unified()
    .use(markdown)
    .use(getPluginList())
    .use(gfm)
    .use(remark2Rehype, { allowDangerousHtml: true })
    .use(html, { allowDangerousHtml: true })
    .processSync(inputMD);

  return String(resultHTML);
};
