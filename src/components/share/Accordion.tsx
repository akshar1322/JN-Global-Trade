"use client";
import { useState } from "react";

export default function Accordion({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-4 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <span>{open ? '−' : '+'}</span>
      </div>
      {open && <p className="mt-2 text-gray-600">{content}</p>}
    </div>
  );
}
