"use client"

import { useState } from "react"

import { signIn } from "next-auth/react"

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: ""})
  const [emailExists, setEmailExists] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const postData = async () => {
      const resp = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(formData)
      })
      
      if (resp.ok) {
        signIn("credentials", { email: formData.email, password: formData.password, callbackUrl: 'http://localhost:3000/dashboard' })
      } else if (resp.status === 400) {
        setEmailExists(true)
      } 
    }
    postData()
  }


  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-200">
      <form className="bg-white px-20 py-20 rounded-md flex flex-col gap-1 w-[500px]" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-medium">Sign up.</h1>
        <p className="text-gray-400 mb-6">Enter some of your information to get access to Bug Splat.</p>
        <label htmlFor="name">Your name</label>
        <input type="text" name="name" onChange={handleChange} className="px-2 py-2 border-2 border-gray-200 rounded-md mb-2"/>
        <div className="flex gap-4">
          <label htmlFor="email">Your Email</label>
          { emailExists && <p className="text-red-700">Email already exists!</p> } 
        </div>
        <input type="email" name="email" onChange={handleChange} className="px-2 py-2 border-2 border-gray-200 rounded-md mb-2"/>
        <label htmlFor="password">Password</label>
        <input type="text" name="password" onChange={handleChange} className="px-2 py-2 border-2 border-gray-200 rounded-md"/>
        <button type="submit" className="bg-teal-600 text-white py-3 rounded-md my-4">Create account</button>
        <p className="self-center">Already have an account? <a className="text-teal-600" onClick={() => signIn()}>Log in</a></p>
      </form>
    </div>
  )
}