"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader } from "lucide-react";
import { toast } from "sonner";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [confirm,   setConfirm]   = useState("");
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState<Record<string,string>>({});
  const [showPwd, setShowPwd]     = useState(false);
  const [showConf, setShowConf]   = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  

  const validate = () => {
    const e: Record<string,string> = {};
    if (!firstName.trim()) e.firstName = "First name is required";
    if (!lastName.trim())  e.lastName  = "Last name is required";
    if (!email.match(/^\S+@\S+\.\S+$/)) e.email = "Valid email is required";
    if (password.length < 6)            e.password = "Password must be ≥6 chars";
    if (confirm !== password)           e.confirm  = "Passwords must match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try{
      setLoading(true)
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const body = await res.json();
      if (!res.ok) {
        toast.error(body.message || "Sign-up failed")
        return;
      }
      setModalOpen(true);
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setConfirm('')
    }catch(err){
      toast.error(err.message || "Sign-up failed")
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="grid place-items-center h-[800px] xl:h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-4"
      >
        <h1 className="text-3xl font-semibold text-gray-900 text-center">
          Create Account
        </h1>

        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-gray-700">Password</label>
          <input
            type={showPwd ? "text" : "password"}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPwd(v => !v)}
            className="absolute inset-y-0 right-3 top-6 text-gray-500"
          >
            {showPwd ? "🙈" : "👁️"}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type={showConf ? "text" : "password"}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConf(v => !v)}
            className="absolute inset-y-0 right-3 top-6 text-gray-500"
          >
            {showConf ? "🙈" : "👁️"}
          </button>
          {errors.confirm && (
            <p className="text-red-500 text-sm">{errors.confirm}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition grid place-items-center"
          disabled={loading}
        >
          {
            loading ? <Loader className='animate-spin'/> : 'Sign Up'
          }
        </button>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
     
      

      {/* ✅ Success Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-sm text-center space-y-4">
            <h2 className="text-2xl font-semibold">Account Created!</h2>
            <p>Your account was successfully created.</p>
            <Link
              href="/signin"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go to Sign In
            </Link>

            <button className='ml-[5px] cursor-pointer' onClick={()=>setModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
