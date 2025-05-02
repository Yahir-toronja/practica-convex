import { SignIn } from "@clerk/nextjs";

export default function signInPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-between bg-gray-50">
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
  );
}
