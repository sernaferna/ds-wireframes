# Common Library (@devouringscripture/common)

A library with common code leveraged across the other applications (and libraries).

As with the APIs (**ds-api** and **ds-vapi**), a number of differend kinds of functionality were merged together for the sake of having a single helper project, though in the real world this should be broken up into several projects.

## Bible Reference/OSIS Parsing and Formatting

A number of functions are provided for parsing and working with Bible passage references. These functions make heavy use of the [**Bible Passage Reference Parser**](https://github.com/openbibleinfo/Bible-Passage-Reference-Parser) and [**Bible Reference Formatter**](https://github.com/openbibleinfo/Bible-Reference-Formatter) libraries. In fact, a number of these functions are just wrappers over those libraries, which do the heavy lifting. Helper functions like `isPassageRefValid()` (returning a simple Boolean as opposed to a complicated object or OSIS string that need to be parsed) are easier to use in the wireframe.

These functions can:

- Determine if a reference is **valid**; e.g.
  - `James 1:19` is valid
  - `James 1:1-19` is valid
  - `Blah 53:13` is not because "Blah" isn't a recognized book
  - `James 7:5` is not because James only has 5 chapters
- Return an **OSIS string** for a reference string (e.g. `James 1:19` returns `Jas.1.19`)
- Return a readable reference string for an OSIS string (e.g. `Jas.1.19` returns `James 1:19`)

### Terminology

To clear up some of what was just described, here's some commonly used terminology being used across this project:

<!-- prettier-ignore -->
| Term | Description | Examples |
|--|--|--|
| **Passage** | A generic term for a set of verses in Scripture; a single verse, a range of verses, or even an array of ranges of verses.  | N/A |
| **OSIS** | A specially formatted string for labeling a passage of Scripture, used in the **OSIS** XML standard for marking up Bible passages. This library doesn't use the OSIS XML format, it just uses the part of the standard around naming/labeling Bible passages -- mostly because the underlying libraries being leveraged do so, and the format is a handy standard to use for machine-readable passage references.  | `Jas.1.1` for James 1:1; `1Cor.2.5` for 1 Corinthians 2:5; `Jas.1.1-Jas.1.5,1Cor.2.4-1Cor.2.5` for two ranges of James 1:1-5 and 1 Corinthians 2:4-5 |
| **Reference** | A human-readable string for labeling a passage of Scripture, following the conventions most English speaking people are used to. | `James 1:1`, `1 Corinthians 2:4-5` |
| **Range** | A set of verses with a beginning and an end. Some APIs and some UI work with arrays of ranges. | `Gen.1.1-Gen.1.2` is a range of 2 verses; `Gen.1.1` is a range of one verse. Code working with ranges might record `Gen.1.1` as a range with the same starting and ending point. |
| Verse | A single verse. |  |

## Data Model

A set of commonly used type definitions used across the other applications. In many cases these types are used both for an API that returns (or receives) some data and for the UI which works with that data.

## Errors

Errors that can be returned from the APIs.

## Middlewares

A set of Express **middleware** functions that are shared across the APIs, for consistency. Includes functions for:

- **Error handling**, to ensure that errors are handled consistently across all APIs
- **404 handling**, for cases where an attempt is made to call an API with an invalid path
- Consistent **logging**
- Functionality used for **validating requests**, such that APIs receiving invalid data will always handle the scenario consistently.

## Testing

Some _very_ basic [**Jest**](https://jestjs.io/) unit cases were added for _some_ of the functions, but only where it was deemed to be a time saver in the long run.
