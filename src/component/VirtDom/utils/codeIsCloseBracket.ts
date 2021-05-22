export const codeIsCloseBracket = (template: LooseObject): boolean => template.record.content.replace(/ /ig, '') === '{%}%}'
