import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <div className="max-w-[360px]">
      <p className="caption-category mb-4">TTIYONG.ART · ADMIN</p>
      <h1 className="text-[40px] font-bold tracking-[-0.02em] text-foreground mb-10">
        Login<span className="text-accent">.</span>
      </h1>
      <LoginForm />
    </div>
  );
}
