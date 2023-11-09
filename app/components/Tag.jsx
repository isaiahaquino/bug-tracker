

export default function Tag({ category }) {
  switch (category) {
    case "UXDesign":
      return <h1 className="bg-teal-200 w-fit rounded-md p-2">UX Design</h1>
    case "UIDesign":
      return <h1 className="bg-pink-200 w-fit rounded-md p-2">UI Design</h1>
    case "Developing":
      return <h1 className="bg-blue-200 w-fit rounded-md p-2">Developing</h1>
    default:
      return <></>
  }
}