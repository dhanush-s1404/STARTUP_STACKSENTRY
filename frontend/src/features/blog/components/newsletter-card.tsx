"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { api } from "@/services/api";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }
    setStatus("loading");
    try {
      const data = await api.post<{
        status: string;
        message: string;
      }>("/contact/newsletter", { email });
      if (data.status === "success" || data.status === "exists") {
        setStatus("success");
        setMessage("Thanks for subscribing!");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to subscribe. Please try again.");
    }
  };

  return (
    <Card
      glass
      padding="lg"
      className="bg-gradient-to-br from-blue-600/10 to-purple-600/10"
    >
      <Mail className="h-8 w-8 text-blue-400 mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">
        Stay Updated
      </h3>
      <p className="text-sm text-white/40 mb-4">
        Get the latest insights and news delivered to your inbox.
      </p>

      {status === "success" ? (
        <div className="flex items-center gap-2 py-3">
          <Check className="h-5 w-5 text-green-400" />
          <span className="text-sm text-green-400">{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={cn(
                "w-full rounded-xl border bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/30",
                "border-white/[0.06] focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20",
                "transition-all"
              )}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="w-full"
            disabled={status === "loading"}
            icon={status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            iconPosition="right"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </Button>
          {message && status === "error" && (
            <p className="text-xs text-red-400">{message}</p>
          )}
        </form>
      )}
    </Card>
  );
}
