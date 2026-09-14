import { useRouter } from 'next/router';

export default function Comment() {
  const router = useRouter();
  const { text } = router.query;

  // Plain text rendering — React auto-escapes this, no XSS possible
  return (
    <main style={{ padding: '4rem', fontFamily: 'sans-serif' }}>
      <h1>Comment</h1>
      <div>{text}</div>
    </main>
  );
}
