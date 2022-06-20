import { Modal, Table } from 'react-bootstrap';

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
          This text box accepts <b>markdown</b>, a simplified way of adding formatting to text.
        </p>

        <h1>Standard Markdown</h1>

        <p>
          If you're familiar with <b>markdown</b> then much of what you can do here will be familiar to you. For
          example:
        </p>

        <Table size="sm" responsive striped>
          <thead>
            <tr>
              <th>Markdown</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>Bold with double **asterisks** or __underlines__</code>
              </td>
              <td className="reading-text">
                Bolded with double <b>asterisks</b> or <b>underlines</b>
              </td>
            </tr>
            <tr>
              <td>
                <code>Italicize with single *asterisks* or _underlines_</code>
              </td>
              <td className="reading-text">
                Italicize with single <i>asterisks</i> or <i>underlines</i>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <code># Heading 1</code>
                </p>
                <p>
                  <code>Text</code>
                </p>
                <p>
                  <code>## Heading 2</code>
                </p>
                <p>
                  <code>text</code>
                </p>
                <p>
                  <code>### Heading 3</code>
                </p>
                <p>
                  <code>text</code>
                </p>
              </td>
              <td className="reading-text">
                <h1>Heading 1</h1>
                <p>Text</p>
                <h2>Heading 2</h2>
                <p>text</p>
                <h3>Heading 3</h3>
                <p>text</p>
              </td>
            </tr>
          </tbody>
        </Table>

        <h1>Special Markdown</h1>
        <p>
          Devouring Scripture has also included some special cases of markup that can be used specifically for the kind
          of text that often gets used in Christian contexts.
        </p>

        <Table size="sm" responsive striped>
          <thead>
            <tr>
              <th>Button</th>
              <td>Description</td>
              <th>Markup</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b className="sc">LORD</b>
              </td>
              <td>
                Renders text in <span style={{ fontVariant: 'small-caps' }}>Small Caps</span>, ensuring that the first
                letter is capitalized, while allowing the original text to stay all Caps.
              </td>
              <td>
                <code>The ^^^LORD^^^ is one.</code>
              </td>
              <td className="reading-text">
                The <span className="sc">LORD</span> is one.
              </td>
            </tr>
            <tr>
              <td>
                <span className="sc2">A.D.</span>
              </td>
              <td>
                Renders text in small caps, but none of the letters will be capitalized (even though they're all
                capitalized in the original).
              </td>
              <td>
                <code>It took place in 30^^A.D.^^.</code>
              </td>
              <td className="reading-text">
                It took place in 30<span className="sc2">A.D.</span>.
              </td>
            </tr>
            <tr>
              <td>
                <span style={{ fontVariant: 'small-caps' }}>SmCa</span>
              </td>
              <td>Normal Small Caps style</td>
              <td>
                <code>He is the ^-^I Am^-^</code>
              </td>
              <td className="reading-text">
                He is the <span style={{ fontVariant: 'small-caps' }}>I Am</span>
              </td>
            </tr>
            <tr>
              <td>
                <mark>abc</mark>
              </td>
              <td>Highlights text</td>
              <td>
                <code>Text can be ==highlighted== if desired</code>
              </td>
              <td className="reading-text">
                Text can be <mark>highlighted</mark> if desired
              </td>
            </tr>
            <tr>
              <td>
                2<sup>2</sup>
              </td>
              <td>Superscripts text</td>
              <td>
                <code>In the 21^st^ Century</code>
              </td>
              <td className="reading-text">
                In the 21<sup>st</sup> Century
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};
