import DOMPurify from 'dompurify';

export function HtmlRender({ content }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}></div>
  );
}
