import { ApiKey } from './../../src/value-objects/apiKey';
import { isValideApiKey } from './../../src/utils/is-valide-apiKey';
describe('isValideApiKey', () => {
  it('should return false if the api key is invalid', () => {
    const result = isValideApiKey('invalide api key');
    expect(result).toBe(false);
  });

  it('should return true if the api key is valid', () => {
    const result = isValideApiKey('9fad0b4e99bb3463ef3d3d');
    expect(result).toBe(true);
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
