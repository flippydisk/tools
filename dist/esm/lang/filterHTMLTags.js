/**
 * @function filterHTMLTags
 * @parent Lang
 * @description Filters HTML tags and special chars that turn into HTML tags (like how &lt; = <)
 *
 * @param {String} string String data containing tags or psuedo-tags to be striped.
 * @return {String} Cleaned text string, stripping all HTML tags and psuedo-tags.
 */
export default function filterHTMLTags(string) {
    return string
        .replace(/&lt;(?:.|\n)*?&gt;/gm, '')
        .replace(/<(?:.|\n)*?>/gm, '');
}
