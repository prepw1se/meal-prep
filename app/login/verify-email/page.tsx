"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent you a verification link. Please check your email to complete the signup process.
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-gray-500 text-center">
            <p>Didn't receive the email?</p>
            <p>Check your spam folder or</p>
            <Button
              variant="link"
              className="text-green-600 hover:text-green-500"
              onClick={() => {
                // TODO: Implement resend verification email
              }}
            >
              click here to resend
            </Button>
          </div>

          <div className="pt-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="w-full"
              >
                Return to login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
