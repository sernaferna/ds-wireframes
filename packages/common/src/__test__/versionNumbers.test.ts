import { v2GTV1, isVersionValid } from '../helpers/VersionNumberHelpers';

describe('tests for version number validation', () => {
  it('returns true for a 3 character version number', () => {
    expect(isVersionValid('1.1.1')).toBeTruthy();
  });

  it('returns true for large version numbers', () => {
    expect(isVersionValid('1984759876.10450947.9087983')).toBeTruthy();
  });

  it("returns true for 0's in version", () => {
    expect(isVersionValid('0.0.0')).toBeTruthy();
  });

  it('returns false when non-numeric version used', () => {
    expect(isVersionValid('n.n.n')).toBeFalsy();
  });

  it('returns false when too many digits', () => {
    expect(isVersionValid('1.0.0.0')).toBeFalsy();
  });
});

describe('tests for version number comparisons', () => {
  it('returns true when a major is larger than a minor', () => {
    expect(v2GTV1('2.1.0', '0.9.0')).toBeTruthy();
  });

  it("returns false when major doesn't work", () => {
    expect(v2GTV1('2.1.0', '9.1.0')).toBeFalsy();
  });
});
