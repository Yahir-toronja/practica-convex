import {SignIn} from "@clerk/nextjs";

export default function signInPage() {
    return(
        <>
        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-3">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto", 
              card: "mx-auto",
            },
          }}
        />
      </div>
        </>
    )
}