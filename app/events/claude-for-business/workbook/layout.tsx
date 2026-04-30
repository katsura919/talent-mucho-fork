export default function WorkbookLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body > .fixed.top-0,
        body > section,
        body > header,
        nav { display: none !important; }
      `}</style>
      {children}
    </>
  );
}
