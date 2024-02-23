"use client"

import { useState } from "react"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Auth() {
  const [formData, setFormData] = useState({ name: "", email: "", password: ""})
  const [newUser, setNewUser] = useState(true)
  const [emailExists, setEmailExists] = useState(false)
  const [invalidLogin, setInvalidLogin] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value })
  }

  const changeMode = (e) => {
    e.preventDefault()
    setFormData({ name: "", email: "", password: ""})
    setNewUser(!newUser)
    setEmailExists(false)
    setInvalidLogin(false)
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

    const customSignin = async () => {
      const resp =  await signIn("credentials", { email: formData.email, password: formData.password, redirect: false })
      if (resp.error) {
        console.log(resp.error)
        setInvalidLogin(true)
      } else {
        router.push("/dashboard")
      }
    }

    if (newUser) {
      postData()
    } else {
      customSignin()
    }
  }


  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-tr from-slate-200 to-teal-300">
      <form className="bg-white shadow-xl px-20 py-20 rounded-xl flex flex-col gap-1 w-[500px]" onSubmit={handleSubmit}>
        <h1 className={`text-2xl font-medium ${newUser ? "" : "mb-6"}`}>{newUser ? "Sign up." : "Welcome back!"}</h1>
        { newUser && 
        <>
          <p className="text-gray-400 mb-6">Enter some of your information to get access to Bug Splat.</p>
          <label htmlFor="name">Your name</label>
          <input type="text" name="name" id="name" onChange={handleChange} value={formData.name} className="px-2 py-2 border-2 border-gray-200 rounded-md mb-2" required/>
        </>
        }
        <div className="flex gap-4">
          <label htmlFor="email">Your Email</label>
          { emailExists && <p className="text-red-700">Email already exists!</p> } 
        </div>
        <input type="email" name="email" id="email" onChange={handleChange} value={formData.email} className="px-2 py-2 border-2 border-gray-200 rounded-md mb-2" required/>
        <label htmlFor="password">Password</label>
        <input type={`${newUser ? "text" : "password"}`} name="password" id="password" onChange={handleChange} value={formData.password} className="px-2 py-2 border-2 border-gray-200 rounded-md" required/>
        {invalidLogin && (
          <p className="text-red-700 self-center mt-3">Invalid login credentials.</p>
        )}
        <button type="submit" className="bg-teal-600 text-white py-3 rounded-md my-4">{newUser ? "Create account" : "Sign In"}</button>
        { newUser ? 
          <span className="flex gap-2 self-center"><p>Already have an account?</p><button className="text-teal-600" onClick={changeMode}>Log in</button></span>
          :
          <span className="flex gap-2 self-center"><p className="self-center">Don&apos;t have an account?</p><button className="text-teal-600" onClick={changeMode}>Sign up</button></span>
        }
      </form>
    </div>
  )
}