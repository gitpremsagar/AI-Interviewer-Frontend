import { Button } from "@/components/ui/button";
import Link from "next/link";
const SignUpSuccessPage = () => {
  return (
    <div className="p-20 text-center">
      <h1>Sign Up Successful!</h1>
      <p>
        Your account has been created successfully. You can now log in with your
        new account.
      </p>
      <Link href="/login">
        <Button>Log In</Button>
      </Link>
    </div>
  );
};

export default SignUpSuccessPage;
