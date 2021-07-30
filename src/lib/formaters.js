export const QuickDate = (date) => {
    var splited = date.split('-');
    var result = `${splited[1]} / ${splited[2]} / ${splited[0]}`;
    return result;
}