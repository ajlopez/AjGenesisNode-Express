
function normalize(text) {
    if (!text)
        return null;
        
    return text.toLowerCase();
}

function pluralize(text) {
    if (!text)
        return null;
        
    if (text[text.length - 1] == 's')
        return text;
        
    if (text[text.length - 1] == 'y')
        return text.substring(0, text.length - 1) + 'ies';
        
    return text + 's';
}

module.exports = {
    normalize: normalize,
    pluralize: pluralize
};