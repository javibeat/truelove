// Fades every route in — gives navigation an app-like feel.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>
}
