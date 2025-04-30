import { SignUp } from "@clerk/nextjs";


export default function SignInPage() {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <SignUp appearance={{
            elements: {
              rootBox: "mx-auto", 
              card: "mx-auto",
            },
          }}
        />
      </div>
    );
  }