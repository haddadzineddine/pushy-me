import Pushy from '../../src/index';

describe('Pushy', () => {
  it('should be defined', () => {
    expect(Pushy.create('9fad0b4e99bb3463ef3d3d')).toBeDefined();
  });

  it('should throw an error if we instantiate Pushy with invalid api key', () => {
    expect(() => {
      Pushy.create('invalide api key');
    }).toThrowError('Invalid API Key');
  });
});
