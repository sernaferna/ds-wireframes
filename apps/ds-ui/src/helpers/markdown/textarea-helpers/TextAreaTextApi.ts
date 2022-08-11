import { TextRange, TextState, insertTextAtPosition, getStateFromTextArea } from '.';

export class TextAreaTextApi {
  constructor(private textArea: HTMLTextAreaElement) {}

  replaceSelection(text: string): TextState {
    insertTextAtPosition(this.textArea, text);
    return getStateFromTextArea(this.textArea);
  }

  getSelectionRange(selection: TextRange): TextState {
    this.textArea.focus();
    this.textArea.selectionStart = selection.start;
    this.textArea.selectionEnd = selection.end;
    return getStateFromTextArea(this.textArea);
  }
}
