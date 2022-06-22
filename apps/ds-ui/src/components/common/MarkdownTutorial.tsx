import { Accordion, Modal } from 'react-bootstrap';
import MDEditor from '@uiw/react-md-editor';
import { MarkdownPreview } from './md-helpers/MarkdownPreview';

interface IReadOnlyMarkdownBox {
  text: string;
}
const ReadOnlyMarkdownBox = ({ text }: IReadOnlyMarkdownBox) => {
  return (
    <div className="my-3">
      <MDEditor
        value={text}
        highlightEnable={true}
        preview="edit"
        defaultTabEnable={false}
        visiableDragbar={false}
        hideToolbar={true}
        textareaProps={{ style: { fontFamily: 'Courier New, monospace' } }}
        style={{ fontFamily: 'Courier New, monospace' }}
      />
    </div>
  );
};

interface IFormattedExample {
  text: string;
}
const FormattedExample = ({ text }: IFormattedExample) => {
  return (
    <div className="my-3">
      <MarkdownPreview content={text} shaded={true} />
    </div>
  );
};

const basicExamples = `Text can be made bold by surrounding it with **double asterisks** or __double underlines__. Italics can be applied by surrounding text with *single asterisks* or _single underlines_. Highlighting can be applied by surrounding it with ==two equal signs==.

The caret can be used for superscript text (such as in 21^st^ Century).

A "strikethrough" effect can be created by surrounding it with ~~two tilde~~ characters.

A hyperlink to another website can be created with square and round brackets; for example, a link to [Google](https://www.google.ca), where the square brackets are the text that will be displayed and the round brackets contain the URL for the link. A URL can also simply be included on its own, and a link will be rendered; e.g. https://www.google.ca will be a link that can be clicked in the formatted output.`;

const twoParagraphs = `This is one paragraph.

This is another.






And this is a third, regardless of how many empty lines came before it!`;

const headingsExample = `# This is the biggest heading
And some normal text
## This is the second biggest heading
And some more normal text
### This is the third biggest heading
With some final normal text`;

const headersWithSpaces = `### A heading
A paragraph under that heading
### Another heading


Another paragraph, under the second heading`;

const lists = `Asterisks can be used to create bulleted lists:

* This is the first item in a bulleted list.
* This is the second
    * This is a sub-bullet
* This is a final bullet in the list

Numbers (with periods) can be used to create numbered lists:

1. This is the first item in a numbered list
2. This is the second
    1. This is a sub-item
3. This is the final bullet in the list

The numbers in a numbered list don't need to be properly in order:

1. This is the first item in a numbered list
1. This is the second, regardless of the number used in markdown`;

const tableExample = `Tables are created with | characters, along with - characters to delineate the headings.

| Person | Score |
|--|--|
| Suresh | 15 |
| Samantha | 20 |

If desired, the spacing can be made more precise; it won't change the resultant formatted view, but sometimes helps with readability in markdown format:

| Person   | Score |
|----------|-------|
| Suresh   | 15    |
| Samantha | 20    |`;

const footnoteExample = `This text includes[^1] a footnote.

[^1]: This is the footnote. It will show up at the bottom of the formatted output, regardless of where it comes in the markdown.

This paragraph continues on after the first one.`;

const complexFootnoteExample = `This text includes[^2] a couple[^1] of footnotes.

[^2]: This is the first footnote

[^1]: This is the second`;

const lordExample = `The ^^^LORD GOD^^^ is good.`;
const adbcExample = `From 1500^^B.C.^^ through to 2022^^A.D.^^ is a long time.`;

const bibleLinkExamples = `It says in [[Rom 1:1]NIV] that Paul is an Apostle, even though he wasn't one of the *original* Apostles (as called out in [[Matt 10:5-15]ESV] or [[Mark 3:13-21]] or ==other examples==.)

If you're interested, the **Apostles' Creed** can be found at the [Christian Reformed Church website](https://www.crcna.org/welcome/beliefs/creeds/apostles-creed)`;

const smallCapsExample = `This text includes an example of ^-^Small Caps^-^ in it.`;

interface IMarkdownTutorial {
  show: boolean;
  handleClose(): void;
}
export const MarkdownTutorial = ({ show, handleClose }: IMarkdownTutorial) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="xl" fullscreen="xl-down">
      <Modal.Header closeButton>
        <Modal.Title>Markdown Tutorial</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          This text box accepts a notation called <b>markdown</b>, which is a simplified way of adding formatting to
          text. With markdown you can use formatting like <b>bold</b>, <i>italics</i> and even <mark>highlighting</mark>
          , not to mention specialised formatting of use to the Christian (such as being able to use the name L
          <span style={{ fontVariant: 'small-caps' }}>ord</span>).
        </p>

        <p>
          You might be wondering, "Do I really <i>need</i> to learn this 'markdown' notation?" And the answer is no, you
          don't! Markdown is designed such that you only need to use the parts you want; if all you want to do is write
          some text with no formatting, you can! But if you ever decide to use italics, you can; if you want to create a
          link to a particular Bible verse, you can; if you want to highlight something, to come back to later, you can.
          You can learn just the parts of markdown you need, as you need them, without burdoning yourself with a huge
          learning endeavour.
        </p>

        <p>
          <b>Note</b>: When the full-screen version of the text editor is used there is a toolbar with buttons for many
          of these formatting options and other markdown features.
        </p>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Text Formatting</Accordion.Header>
            <Accordion.Body>
              <p>There are some very easy things you can do to format text as you write it, as illustrated here.</p>

              <ReadOnlyMarkdownBox text={basicExamples} />

              <p>would be rendered as:</p>

              <FormattedExample text={basicExamples} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Paragraphs</Accordion.Header>
            <Accordion.Body>
              <p>
                No special formatting is required to create paragraphs; pressing <i>Enter</i> two (or more) times at the
                end of a line will create paragraphs as expected. For example:
              </p>

              <ReadOnlyMarkdownBox text={twoParagraphs} />

              <p>Will produce:</p>

              <FormattedExample text={twoParagraphs} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Headings</Accordion.Header>
            <Accordion.Body>
              <p>
                Headers can also be created by using <code>#</code> characters at the beginning of the heading; one{' '}
                <code>#</code> for the largest heading, two for a smaller one, and three for a smaller one still:
              </p>

              <ReadOnlyMarkdownBox text={headingsExample} />

              <p>Will produce:</p>

              <FormattedExample text={headingsExample} />

              <p>The number of empty lines between the headings don't make a difference. For example:</p>

              <ReadOnlyMarkdownBox text={headersWithSpaces} />

              <p>Will produce:</p>

              <FormattedExample text={headersWithSpaces} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>Lists and Bullets</Accordion.Header>
            <Accordion.Body>
              <p>
                Numbered and bulleted lists can be created by putting an asterisk or number at the beginning of each
                item in the list. Asterisks will create bullets, and numbers will create a numbered list.
              </p>

              <ReadOnlyMarkdownBox text={lists} />

              <p>Will produce:</p>

              <FormattedExample text={lists} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>Tables</Accordion.Header>
            <Accordion.Body>
              <p>
                A table can be created with careful use of the <code>|</code> (pipe) character. Consider the following
                example, in which a header is created for the table followed by two "normal" rows:
              </p>

              <ReadOnlyMarkdownBox text={tableExample} />

              <p>The following output would be produced:</p>

              <FormattedExample text={tableExample} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>Footnotes</Accordion.Header>
            <Accordion.Body>
              <p>Perhaps a niche capability, but footnotes can also be created. There are two parts to this markup:</p>

              <ol>
                <li>
                  In the body of the text include a <b>footnote reference</b> such as <code>[^#]</code>, where{' '}
                  <code>#</code> is a number; <code>[^1]</code>, <code>[^2]</code>, etc.
                </li>
                <li>
                  The footnote itself, which starts with <code>[^#]:</code>&mdash;that is, matching the footnote
                  reference, with a <code>:</code>
                </li>
              </ol>

              <p>such as in the following example:</p>

              <ReadOnlyMarkdownBox text={footnoteExample} />

              <p>
                In the following formatted output, notice that the footnote will show up at the very bottom, regardless
                of where it was placed in the markdown text:
              </p>

              <FormattedExample text={footnoteExample} />

              <p>
                Similar to the examples for numbered lists, the numbering used is irrelevant. The first footnote
                reference (<code>[^#]</code>) will be matched with the first footnote (<code>[^#]:</code>), the second
                with the second, etc. For example:
              </p>

              <ReadOnlyMarkdownBox text={complexFootnoteExample} />

              <p>Will produce:</p>

              <FormattedExample text={complexFootnoteExample} />

              <p>
                Notice that the numbers are in the correct order, even though they were incorrect in the original
                markdown.
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <h3 className="mt-3">Special Markdown</h3>
        <p>
          All of the examples given so far are for "standard" markdown notation; anyone familiar with markdown would be
          familiar with the examples given, even if some (such as footnotes) might be less common than others (such as
          bold and italics). Devouring Scripture has also introduced some special notations that can be used
          specifically for the kind of text that often gets used in Christian contexts.
        </p>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Links to the Bible Gateway</Accordion.Header>
            <Accordion.Body>
              <p>
                As mentioned above, hyperlinks can be created in markdown using the{' '}
                <code>[Hyperlink text](hyperlinkUrl)</code> notation, but for Devouring Scripture it's assumed that you
                may want to be specifically creating links to specific passages of Scripture, using the{' '}
                <b>Bible Gateway</b> website. For this reason, a special notation was created in the format{' '}
                <code>[[Reference]]</code> or <code>[[Reference]Version]</code>, where the reference is a Scripture
                reference and the version is the version of the Bible that should be used (defaulting to ESV if not
                specified).
              </p>

              <p>For example:</p>

              <ReadOnlyMarkdownBox text={bibleLinkExamples} />

              <p>Would be rendered as:</p>

              <FormattedExample text={bibleLinkExamples} />

              <p>Notice that the rendered version of the link has some formatting applied to it:</p>

              <ul>
                <li>Even if an abbreviation is used for the reference, a more complete, formatted version is used</li>
                <li>The version is shown in parantheses after the passage</li>
                <li>
                  A small cross icon is also appended, to differentiate these specific Bible Gateway links from other,
                  regular links (as opposed to the other link included in this example, that doesn't have that icon).
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>All Capitalized Words/Names</Accordion.Header>
            <Accordion.Body>
              <p>
                Some words&mdash;especially proper names&mdash;appear in all capital letters in the Scriptures; the most
                common example is the name of the L<span style={{ fontVariant: 'small-caps' }}>ord</span> in Old
                Testament Scriptures. For readability, these words are often written in <b>Small Caps</b>, as was used
                here, where the first letter is larger than the other letters, even though they're all capitalized. For
                the Christian, these words should always be in all uppercase, even if they're formatted differently.
                Surrounding text with three carets (such as <code>^^^LORD^^^</code>) will cause it to be rendered
                similar to L<span style={{ fontVariant: 'small-caps' }}>ord</span>; in the markdown the letters will be
                all uppercase, on devices that don't support advanced formatting it will also be all uppercase, and on
                devices that support more advanced formatting it will be rendered in all uppercase in Small Caps format.
              </p>

              <p>For example:</p>

              <ReadOnlyMarkdownBox text={lordExample} />

              <p>Will be rendered as:</p>

              <FormattedExample text={lordExample} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Smaller (but still capitalized) Terms</Accordion.Header>
            <Accordion.Body>
              <p>
                This is similar to the case of all capitalized words, except that all of the letters are rendered in the
                smaller capitalized versions. For this notation two carets are used instead of three (e.g.{' '}
                <code>^^A.D.^^</code>) The best examples are the terms{' '}
                <span style={{ fontVariant: 'small-caps' }}>a.d.</span> and{' '}
                <span style={{ fontVariant: 'small-caps' }}>b.c.</span>. For example:
              </p>

              <ReadOnlyMarkdownBox text={adbcExample} />

              <p>Which would be rendered as:</p>

              <FormattedExample text={adbcExample} />

              <p>
                Once again, the markdown is all in uppercase, and devices that don't support advanced formatting will
                render it as uppercase, but devices that support advanced formatting will show a more pleasing version
                of the text.
              </p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>Small Caps</Accordion.Header>
            <Accordion.Body>
              <p>
                Text can be rendered as normal Small Caps by surrounding it with <code>^-^</code> notations, such as{' '}
                <code>^-^This Is Small Caps^-^</code>. This is not a common markdown notation. For example:
              </p>

              <ReadOnlyMarkdownBox text={smallCapsExample} />

              <p>Would be rendered as:</p>

              <FormattedExample text={smallCapsExample} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Modal.Body>
    </Modal>
  );
};
