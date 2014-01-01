
function normalize(text) {
    return text.toLowerCase();
}

function pluralize(text) {
    return text + 's';
}

module.exports = {
    normalize: normalize,
    pluralize: pluralize
};