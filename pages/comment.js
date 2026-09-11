import { useRouter } from 'next/router';

export default function Comment() {
  const router = useRouter();
  const { text } = router.query;

  // 5. XSS: rendering unsanitized query-string input directly as HTML
  return (
    <main style={{ padding: '4rem', fontFamily: 'sans-serif' }}>
      <h1>Comment</h1>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </main>
  );
}
