
export const INCREMENT_CASE = 'INCREMENT_CASE';

export function incrementCase(params){
    return {
        type: INCREMENT_CASE,
        caseItem: params
    }
}