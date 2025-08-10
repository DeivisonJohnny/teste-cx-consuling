// components/url-input-form.tsx
"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "./spinner";

interface UrlInputFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function UrlInputForm({
  onSubmit,
  isLoading,
  error,
}: UrlInputFormProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="url"
          placeholder="Enter product page URL (e.g., https://example.com/product)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="flex-1 text-black "
          aria-label="Product page URL input"
        />
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Spinner className="mr-2" /> Analyzing...
            </>
          ) : (
            "Analyze Page"
          )}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </form>
  );
}
