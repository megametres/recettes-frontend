import { DurationReadablePipe } from './duration-readable.pipe';

describe('DurationReadablePipe', () => {
  it('create an instance', () => {
    const pipe = new DurationReadablePipe();
    expect(pipe).toBeTruthy();
  });
});
