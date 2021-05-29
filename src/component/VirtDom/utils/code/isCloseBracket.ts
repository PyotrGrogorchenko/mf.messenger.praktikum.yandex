export const isCloseBracket = (template: LooseObject): boolean => template.record.content.replace(/ /ig, '') === '{%}%}'
