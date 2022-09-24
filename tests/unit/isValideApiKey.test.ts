import { ApiKey } from './../../src/value-objects/apiKey';
import { isValideApiKey } from './../../src/utils/is-valide-apiKey';
describe('isValideApiKey', () => {

  const dataSet = {
    '9fad0b4e99bb3463ef3d3d': true,
    '9fad0b4e99bb3463ef3d3d9fad0b4e99bb3463ef3d3d': true,
    'invalide api key': false
  };

  it.each(Object.entries(dataSet))('should return %s for %s', (apiKey, expected) => {
    expect(isValideApiKey(apiKey)).toBe(expected);
  });

  it('should throw an error if we instantiate ApiKey value-object with invalid api key', () => {
    expect(() => {
      new ApiKey('invalide api key');
    }).toThrowError('Invalid API Key');
  });

  it('should not throw an error if we instantiate ApiKey value-object with valid api key', () => {
    expect(() => {
      new ApiKey('9fad0b4e99bb3463ef3d3d');
    }).not.toThrowError('Invalid API Key');
  });
});
