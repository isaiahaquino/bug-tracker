
import Nav from "../components/Nav";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Nav />
      { children }
    </div>
  )
}