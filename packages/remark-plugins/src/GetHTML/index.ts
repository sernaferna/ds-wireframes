import { unified } from 'unified';
import markdown from 'remark-parse';
import html from 'rehype-stringify';
import remark2Rehype from 'remark-rehype';
import supersub from 'remark-supersub';
import gfm from 'remark-gfm';
import { poetryBlocks } from '../bible-poetry';
import { tac } from '../tac';
import { lowerCaps } from '../lower-caps';
import { smallCaps } from '../small-caps';
import { bibleLinks } from '../bible-links';
import { adbcReplacements } from '../ad-bc-replacements';
import { allCapReplacements } from '../all-cap-replacements';
import { highlight } from '../highlight';
import { smartquotes } from '../smartquotes';

/**
 * Helper function to get a properly ordered list of Remark Plugins, for use in converting markdown to HTML.
 *
 * @param autoSmallcap Indicates whether UPPERCASE text should be automatically re-rendered as Small Caps
 * @param autoADBC Indicates whether eras (B.C., A.D.) should be automaticlaly re-rendered as smallcaps
 * @returns List of plugins to be used in rendering markdown to HTML
 */
export const getPluginList = (autoSmallcap: boolean = true, autoADBC: boolean = true) => {
  const pluginList = [poetryBlocks, tac, lowerCaps, smallCaps, bibleLinks];

  if (autoADBC) {
    pluginList.push(adbcReplacements);
  }

  if (autoSmallcap) {
    pluginList.push(allCapReplacements);
  }

  pluginList.push(highlight, supersub, smartquotes);

  return pluginList;
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
