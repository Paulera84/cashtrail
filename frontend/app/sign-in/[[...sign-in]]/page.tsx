import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="pl-140 pt-30 pb-30">
            <SignIn />
        </div>
    );
}