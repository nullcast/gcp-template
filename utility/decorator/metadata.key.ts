export const BaseMetakey = 'custom';
export const EntityMetakey = `${BaseMetakey}.entity`;
export const entityColumnMetakey = (className: string) => `${EntityMetakey}.${className}.column`;
