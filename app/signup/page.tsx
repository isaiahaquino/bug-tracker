

export default function Signup() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-200">
      <form className="bg-white px-20 py-20 rounded-md">
        <h1>Create your account</h1>
        <label htmlFor="firstName">First Name</label>
        <label htmlFor="lastName">Last Name</label>
        <label htmlFor="email">Email</label>
        <label htmlFor="password">Password</label>
        <label htmlFor="confirmPassword">Confirm Password</label>
      </form>
      

    </div>
  )
}