export interface TextRange {
  start: number;
  end: number;
}

export interface TextState {
  text: string;
  selectedText: string;
  selection: TextRange;
}

let browserSupportsTextareaTextNodes: any;

const canManipulateViaTextNodes = (input: HTMLTextAreaElement | HTMLInputElement): boolean => {
  if (input.nodeName !== 'TEXTAREA') {
    return false;
  }

  if (typeof browserSupportsTextareaTextNodes === 'undefined') {
    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.value = '1';
    browserSupportsTextareaTextNodes = !!textarea.firstChild;
  }

  return browserSupportsTextareaTextNodes;
};

export const insertTextAtPosition = (input: HTMLTextAreaElement | HTMLInputElement, text: string): void => {
  input.focus();

  // IE 8-10
  if ((document as any).selection) {
    const ieRange = (document as any).selection.createRange();
    ieRange.text = text;

    // move cursor after inserted text
    ieRange.collapse(false /* to the end */);
    ieRange.selecct();

    return;
  }

  // webkit + edge
  const isSuccess = document.execCommand && document.execCommand('insertText', false, text);
  if (!isSuccess) {
    const start = input.selectionStart!;
    const end = input.selectionEnd!;
    // firefox (nonstandard method)
    if (typeof input.setRangeText === 'function') {
      input.setRangeText(text);
    } else {
      // to make a change we just need a Range, not a Selection
      const range = document.createRange();
      const textNode = document.createTextNode(text);

      if (canManipulateViaTextNodes(input)) {
        let node = input.firstChild;

        // if TA is empty just insert the text
        if (!node) {
          input.appendChild(textNode);
        } else {
          //otherwise we need to find nodes for start and end
          let offset = 0;
          let startNode = null;
          let endNode = null;

          while (node && (startNode === null || endNode === null)) {
            const nodeLength = node.nodeValue!.length;

            //if start of seletion falls into current node
            if (start >= offset && start <= offset + nodeLength) {
              range.setStart((startNode = node), start - offset);
            }

            // if end of selection falls into current node
            if (end >= offset && end <= offset + nodeLength) {
              range.setEnd((endNode = node), end - offset);
            }

            offset += nodeLength;
            node = node.nextSibling;
          }

          // if there is some text selected remove it, as we're replacing it
          if (start !== end) {
            range.deleteContents();
          }
        }
      }

      // If the node is a textarea and the range doesn't span outside the element
      //
      // Get the commonAncestorContainer of the selected range and test its type
      // If the node is of type `#text` it means that we're still working with text nodes within our textarea element
      // otherwise, if it's of type `#document` for example it means our selection spans outside the textarea.
      if (canManipulateViaTextNodes(input) && range.commonAncestorContainer.nodeName === '#text') {
        //finally insert a new node. The browser will automatically split start and end nodes into two if necessary
        range.insertNode(textNode);
      } else {
        // if the node is not a textarea or the range spans outside a text area the only way is to replace the whole value
        const value = input.value;
        input.value = value.slice(0, start) + text + value.slice(end);
      }
    }

    // correct the cursor position to be the end of the insertion
    input.setSelectionRange(start + text.length, start + text.length);

    // notify any possible listeners of the change
    const e = document.createEvent('UIEvent');
    e.initEvent('input', true, false);
    input.dispatchEvent(e);
  }
};

export const getStateFromTextArea = (textArea: HTMLTextAreaElement): TextState => {
  return {
    selection: {
      start: textArea.selectionStart,
      end: textArea.selectionEnd,
    },
    text: textArea.value,
    selectedText: textArea.value.slice(textArea.selectionStart, textArea.selectionEnd),
  };
};

export const getSurroundingWord = (text: string, position: number): TextRange => {
  if (!text) {
    throw Error("Argument 'text' should be truthy");
  }

  const isWordDelimiter = (c: string) => c === ' ' || c.charCodeAt(0) === 10;

  //left index initialized at 0 or else it won't start the iteration
  let start = 0;
  //right index initialized at text.length or else it won't start the iteration
  let end = text.length;

  //iterate to the left
  for (let i = position; i - 1 > -1; i--) {
    if (isWordDelimiter(text[i - 1])) {
      start = i;
      break;
    }
  }

  //iterate to the right
  for (let i = position; i < text.length; i++) {
    if (isWordDelimiter(text[i])) {
      end = i;
      break;
    }
  }

  return { start, end };
};

export interface TextSection {
  text: string;
  selection: TextRange;
}
export const selectWord = ({ text, selection }: TextSection): TextRange => {
  if (text && text.length && selection.start === selection.end) {
    //the user is pointing at a word
    return getSurroundingWord(text, selection.start);
  }

  return selection;
};

export const getBreaksNeededForEmptyLineBefore = (text = '', startPosition: number): number => {
  if (startPosition === 0) {
    return 0;
  }

  // rules:
  // - If we're in the first line, no breaks are needed
  // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
  //      may need to insert 0, 1 or 2 breaks

  let neededBreaks = 2;
  let isInFirstLine = true;
  for (let i = startPosition - 1; i >= 0 && neededBreaks >= 0; i--) {
    switch (text.charCodeAt(i)) {
      case 32: //blank space
        continue;
      case 10: //line break
        neededBreaks--;
        isInFirstLine = false;
        break;
      default:
        return neededBreaks;
    }
  }

  return isInFirstLine ? 0 : neededBreaks;
};

export const getBreaksNeededForEmptyLineAfter = (text = '', startPosition: number): number => {
  if (startPosition === text.length - 1) {
    return 0;
  }

  // rules:
  // - If we're in the first line, no breaks are needed
  // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
  //      may need to insert 0, 1 or 2 breaks

  let neededBreaks = 2;
  let isInLastLine = true;
  for (let i = startPosition; i < text.length && neededBreaks >= 0; i++) {
    switch (text.charCodeAt(i)) {
      case 32:
        continue;
      case 10: {
        neededBreaks--;
        isInLastLine = false;
        break;
      }
      default:
        return neededBreaks;
    }
  }

  return isInLastLine ? 0 : neededBreaks;
};

export class TextAreaTextApi {
  constructor(private textArea: HTMLTextAreaElement) {}

  replaceSelection(text: string): TextState {
    insertTextAtPosition(this.textArea, text);
    return getStateFromTextArea(this.textArea);
  }

  setSelectionRange(selection: TextRange): TextState {
    this.textArea.focus();
    this.textArea.selectionStart = selection.start;
    this.textArea.selectionEnd = selection.end;
    return getStateFromTextArea(this.textArea);
  }
}
