import marked from 'marked';
import pygmentize from 'pygmentize';
import DOMPurify from 'dompurify';

marked.setOptions({
    highlight: (code, lang, callback) => {
        pygmentize({ lang, format: 'html' }, code, (err, res) => callback(err, res));
    },
    smartLists: true,
});

export default md => DOMPurify.sanitize(marked(md));
