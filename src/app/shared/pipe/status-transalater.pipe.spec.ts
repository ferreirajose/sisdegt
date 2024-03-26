import { StatusTransalaterPipe } from './status-transalater.pipe';
import { StatusEnum, StatusEnumMensagem } from '../enum/status';

describe('StatusTransalaterPipe', () => {
  let pipe: StatusTransalaterPipe;

  beforeEach(() => {
    pipe = new StatusTransalaterPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should translate status enum to message', () => {
    const status = StatusEnum.PENDENTE;
    expect(pipe.transform(status)).toEqual(StatusEnumMensagem[status]);
  });

  it('should return undefined for unknown status', () => {
    const unknownStatus = 'UNKNOWN' as StatusEnum;
    expect(pipe.transform(unknownStatus)).toBeUndefined();
  });
});
