import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactSuccess } from "@/features/contact/components/contact-success";

export const metadata: Metadata = {
  title: "Message Sent | StackSentry Technologies",
  description: "Your message has been received. We'll get back to you within 24 hours.",
  robots: { index: false },
};

export default function ContactSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ContactSuccess />
      </main>
      <Footer />
    </>
  );
}
