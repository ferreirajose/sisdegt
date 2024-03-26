import { TypeBootstrap } from './type-bootstrap.enum';

export enum StatusEnum {
    VAZIO = 'VAZIO',
    PENDENTE = 'PENDENTE',
    EM_ANDAMENTO= 'EM_ANDAMENTO',
    CONCLUIDO= 'CONCLUIDO',
}

export const StatusEnumMensagem: {[key: string]: string} = {
    [StatusEnum.VAZIO]: 'Selecione...',
    [StatusEnum.EM_ANDAMENTO]: 'Em Andamento',
    [StatusEnum.PENDENTE]: 'Pendente',
    [StatusEnum.CONCLUIDO]: 'Concluido',
};

export const StatusEnumBadge: {[key: string]: string} = {
    [StatusEnum.CONCLUIDO]: TypeBootstrap.SUCCESS,
    [StatusEnum.PENDENTE]: TypeBootstrap.WARN,
    [StatusEnum.EM_ANDAMENTO]: TypeBootstrap.INFO
};
