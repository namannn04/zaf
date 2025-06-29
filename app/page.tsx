"use client"

import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { updateForm, resetForm } from "@/store/formSlice"
import type { RootState } from "@/store/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Send, User, Mail, Phone, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function FormPage() {
  const form = useSelector((state: RootState) => state.form)
  const dispatch = useDispatch()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateForm({ [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const result = await res.json()

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your application has been submitted successfully.",
        })
        dispatch(resetForm())
      } else {
        throw new Error("Submission failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-10">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Zelosify Application</h1>
        </div>

        <Card className="bg-[#222222] border-gray-800 backdrop-blur-sm shadow-2xl">
          <CardHeader className="space-y-2 pb-8">
            <CardTitle className="text-2xl text-white font-semibold">Application Form</CardTitle>
            <CardDescription className="text-gray-400">
              Please provide your information below. All fields marked with * are required.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </Label>

              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number *
              </Label>

              <Input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume" className="text-white font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Resume Link
              </Label>

              <Input
                id="resume"
                name="resume"
                type="url"
                value={form.resume}
                onChange={handleChange}
                placeholder="Link to your resume (optional)"
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
              />
            </div>

            <div className="pt-6">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-gray-200 font-semibold h-12 text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
