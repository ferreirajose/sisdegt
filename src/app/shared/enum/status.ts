import { TypeBootstrap } from './type-bootstrap.enum';

export enum StatusEnum {
    PENDENTE = 'PENDENTE',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    CONCLUIDO = 'CONCLUIDO',
}

export const StatusEnumMensagem = {
    [StatusEnum.EM_ANDAMENTO]: 'Em Andamento',
    [StatusEnum.PENDENTE]: 'Pendente',
    [StatusEnum.CONCLUIDO]: 'Concluido',
};

export const StatusEnumBadge = {
    [StatusEnum.CONCLUIDO]: TypeBootstrap.SUCCESS,
    [StatusEnum.PENDENTE]: TypeBootstrap.WARN,
    [StatusEnum.EM_ANDAMENTO]: TypeBootstrap.INFO
};
