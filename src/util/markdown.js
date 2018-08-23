import marked from 'marked';
import DOMPurify from 'dompurify';

marked.setOptions({
    smartLists: true,
});

export default md => DOMPurify.sanitize(marked(md));
