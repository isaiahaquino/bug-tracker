
import Nav from "../components/Nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Nav />
      { children }
    </div>
  )
}