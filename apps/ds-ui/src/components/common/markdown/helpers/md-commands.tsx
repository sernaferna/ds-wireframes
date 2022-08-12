import {
  TextState,
  TextAreaTextApi,
  selectWord,
  MDToolbar,
  getBreaksNeededForEmptyLineAfter,
  getBreaksNeededForEmptyLineBefore,
} from '../../../../helpers/markdown';
import {
  TypeBold,
  TypeItalic,
  TypeH1,
  TypeH2,
  TypeH3,
  Link45deg,
  Quote,
  ListOl,
  ListUl,
  BookHalf,
  FileRichtextFill,
  BookFill,
} from 'react-bootstrap-icons';

const replaceTextWith = (
  state: TextState,
  api: TextAreaTextApi,
  token: string,
  endToken: string | undefined = undefined,
  defaultText: string | undefined = undefined
): void => {
  const closingToken = endToken ? endToken : token;
  let newText = '';
  if (defaultText) {
    newText = defaultText;
  }
  if (state.selectedText.length > 0) {
    newText = state.selectedText;
  }
  const newSelectionRange = selectWord({ text: state.text, selection: state.selection });
  const state1 = api.setSelectionRange(newSelectionRange);
  const modifyText = token + newText + closingToken;
  const state2 = api.replaceSelection(modifyText);

  api.setSelectionRange({
    start: state2.selection.end - closingToken.length - state1.selectedText.length,
    end: state2.selection.end - closingToken.length,
  });
};

export const toolbar: MDToolbar = {
  buttonGroups: [
    {
      buttons: [
        {
          name: 'Bold',
          keyboardShortcut: 'ctrl+shift+B',
          buttonContents: <TypeBold />,
          execute(state, api) {
            replaceTextWith(state, api, '**');
          },
        },
        {
          name: 'Italics',
          keyboardShortcut: 'ctrl+shift+L',
          buttonContents: <TypeItalic />,
          execute(state, api) {
            replaceTextWith(state, api, '*');
          },
        },
        {
          name: 'H1',
          buttonContents: <TypeH1 />,
          execute(state, api) {
            replaceTextWith(state, api, '# ', ' ', 'HEADING');
          },
        },
        {
          name: 'H2',
          buttonContents: <TypeH2 />,
          execute(state, api) {
            replaceTextWith(state, api, '## ', ' ', 'HEADING');
          },
        },
        {
          name: 'H3',
          buttonContents: <TypeH3 />,
          execute(state, api) {
            replaceTextWith(state, api, '### ', ' ', 'HEADING');
          },
        },
      ],
    },
    {
      buttons: [
        {
          name: 'Link',
          keyboardShortcut: 'ctrl+shift+K',
          buttonContents: <Link45deg />,
          execute(state, api) {
            const linkURL = prompt('Please enter the URL:');
            if (!linkURL) {
              return;
            }

            const modifyText = `[${state.selectedText}](${linkURL})`;
            api.replaceSelection(modifyText);
          },
        },
        {
          name: 'Quote',
          keyboardShortcut: 'ctrl+alt+Q',
          buttonContents: <Quote />,
          execute(state, api) {
            replaceTextWith(state, api, '> ', ' ', 'QUOTE');
          },
        },
      ],
    },
    {
      buttons: [
        {
          name: 'Bullets',
          buttonContents: <ListUl />,
          execute(state, api) {
            replaceTextWith(state, api, '* ', ' ');
          },
        },
        {
          name: 'Numbered List',
          buttonContents: <ListOl />,
          execute(state, api) {
            replaceTextWith(state, api, '1. ', ' ');
          },
        },
      ],
    },
    {
      buttons: [
        {
          name: 'Highlight',
          keyboardShortcut: 'ctrl+shift+H',
          buttonContents: <mark>abc</mark>,
          execute(state, api) {
            replaceTextWith(state, api, '==', '==', 'HIGHLIGHT');
          },
        },
        {
          name: 'Superscript',
          buttonContents: (
            <span>
              2<sup>2</sup>
            </span>
          ),
          execute(state, api) {
            replaceTextWith(state, api, '^');
          },
        },
        {
          name: 'All Upper',
          keyboardShortcut: 'ctrl+shift+U',
          buttonContents: (
            <b>
              L<span style={{ fontVariant: 'small-caps' }}>ord</span>
            </b>
          ),
          execute(state, api) {
            replaceTextWith(state, api, '^^^', '^^^', 'LORD');
          },
        },
        {
          name: 'SmallCaps',
          buttonContents: <span style={{ fontVariant: 'small-caps' }}>SmCa</span>,
          execute(state, api) {
            replaceTextWith(state, api, '^-^');
          },
        },
        {
          name: 'Era',
          buttonContents: <span style={{ fontVariant: 'small-caps' }}>b.c.</span>,
          execute(state, api) {
            replaceTextWith(state, api, '^^');
          },
        },
      ],
    },
    {
      buttons: [
        {
          name: 'Scripture Link',
          keyboardShortcut: 'ctrl+shift+S',
          buttonContents: (
            <>
              <BookHalf />
              <Link45deg />
            </>
          ),
          execute(state, api) {
            replaceTextWith(state, api, '[|', '|]', 'REF');
          },
        },
        {
          name: 'Custom Scripture Link',
          keyboardShortcut: 'ctrl+alt+S',
          buttonContents: (
            <>
              <BookFill />
              <Link45deg />
            </>
          ),
          execute(state, api) {
            const customText = prompt('Enter the custom text for this link:');
            const modifyText = `[|${state.selectedText || 'REF'} (${customText})|]`;
            api.replaceSelection(modifyText);
          },
        },
        {
          name: 'Scripture Quotation',
          keyboardShortcut: 'ctrl+shift+P',
          buttonContents: <FileRichtextFill />,
          execute(state, api) {
            const selectedText = state.selectedText ? state.selectedText : 'QUOTE';
            const newSelectionRange = selectWord({ text: state.text, selection: state.selection });
            const state1 = api.setSelectionRange(newSelectionRange);
            const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(state1.text, state1.selection.start);
            const breaksBefore = Array(breaksBeforeCount + 1).join('\n');

            const breaksAfterCount = getBreaksNeededForEmptyLineAfter(state1.text, state1.selection.end);
            const breaksAfter = Array(breaksAfterCount + 1).join('\n');

            let newText = '|> ' + selectedText.replaceAll('\n', '\n|> ');
            newText = newText.replaceAll('|>  ', '|> |> ');
            newText = newText.replaceAll(/^(\d+)\s/g, ' ^$1^ ');
            newText = newText.replaceAll(/\s(\d+)\s/g, ' ^$1^ ');

            const capitalizedWordsRE = /\b([\p{Lu}\p{Lt}]{2,})\b/gu;
            newText = newText.replaceAll(capitalizedWordsRE, '^^^$1^^^');

            //replaces the current selection with the scripture quote mark
            api.replaceSelection(`${breaksBefore}${newText}${breaksAfter}`);

            const selectionStart = state1.selection.start + breaksBeforeCount + 2;
            const selectionEnd = selectionStart + selectedText.length;

            api.setSelectionRange({
              start: selectionStart,
              end: selectionEnd,
            });
          },
        },
      ],
    },
  ],
};
