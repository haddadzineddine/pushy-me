import PushyMe from '../../src/index';

describe('PushyMe', () => {
  it('should be defined', () => {
    expect(PushyMe.create('9fad0b4e99bb3463ef3d3d')).toBeDefined();
  });

  it('should throw an error if we instantiate PushyMe with invalid api key', () => {
    expect(() => {
      PushyMe.create('invalide api key');
    }).toThrowError('Invalid API Key');
  });
});
