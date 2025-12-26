import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your studio account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Start managing your fitness studio with RetainFit
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg">
          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 rounded-none w-full",
                headerTitle: "text-center text-2xl font-bold",
                headerSubtitle: "text-center text-gray-600",
                socialButtonsBlockButton: 
                  "w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50",
                formButtonPrimary: 
                  "w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",
                formFieldInput: 
                  "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm",
                formFieldLabel: "block text-sm font-medium text-gray-700 mb-1",
                footerAction: "text-center",
                footerActionLink: 
                  "font-medium text-green-600 hover:text-green-500",
              },
            }}
            path="/sign-up"
            routing="path"
          />
        </div>
      </div>
    </div>
  )
}