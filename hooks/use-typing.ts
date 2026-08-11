"use client";

import { useEffect, useState } from "react";

export function useTyping(words: string[], typingSpeed = 80, pause = 1600) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[index % words.length];

    if (!deleting && subIndex === current.length) {
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((s) => s + (deleting ? -1 : 1));
      },
      deleting ? typingSpeed / 2 : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words, typingSpeed, pause]);

  useEffect(() => {
    setText(words.length ? words[index % words.length].slice(0, subIndex) : "");
  }, [subIndex, index, words]);

  return text;
}
