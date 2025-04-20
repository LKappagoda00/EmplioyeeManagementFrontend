import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <h2 className="text-xl mb-4">Welcome! Choose an option:</h2>
      <div className="flex gap-4">
        <Link href="/login"><Button label="Login" /></Link>
        <Link href="/admin/dashboard"><Button label="Admin Dashboard" /></Link>
      </div>
    </Layout>
  );
}
