import './globals.css';

/*
  Root Layout — חובה ב-Next.js App Router.
  עוטף כל דף באפליקציה ב-<html>/<body> ומייבא את עיצוב הבסיס.
  זהו Server Component (ברירת המחדל) — אין כאן אינטראקטיביות.
*/

export const metadata = {
  title: 'ChromAI — סטודיו צבעים',
  description: 'מחולל פלטות צבע מבוסס AI למעצבים',
};

export default function RootLayout({ children }) {
  return (
    <html lang="he">
      <body>{children}</body>
    </html>
  );
}
