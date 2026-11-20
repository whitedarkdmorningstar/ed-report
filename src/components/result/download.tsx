"use client";

import { toJpeg } from "html-to-image";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function Download() {
  const [loading, setLoading] = useState<boolean>(false);

  async function downloadElementAsImage() {
    const node = document.getElementById("ed-report");
    if (!node) return;

    setLoading(true);

    // 1. Wait for web fonts to finish loading
    await document.fonts.ready;

    // 2. Get the real computed font-family from body (resolves Next.js CSS variables)
    const computedFont = window.getComputedStyle(document.body).fontFamily;

    // 3. Temporarily hide scrollbars on shadcn/ui <Table> wrappers
    const scrollableEls = Array.from(node.querySelectorAll("*")).filter(
      (el) => {
        const style = window.getComputedStyle(el);
        return ["auto", "scroll"].some((val) =>
          [style.overflow, style.overflowX, style.overflowY].includes(val),
        );
      },
    ) as HTMLElement[];

    const previousOverflows = scrollableEls.map((el) => el.style.overflow);
    scrollableEls.forEach((el) => {
      el.style.overflow = "visible";
    });

    // 4. Temporarily swap <caption> with a styled <div> so html-to-image captures it reliably
    const captions = Array.from(node.querySelectorAll("caption"));
    const restoredCaptions: Array<{
      table: HTMLElement;
      caption: HTMLTableCaptionElement;
      placeholder: HTMLDivElement;
    }> = [];

    captions.forEach((caption) => {
      const table = caption.parentElement;
      if (!table) return;

      const placeholder = document.createElement("div");
      const capStyle = window.getComputedStyle(caption);
      placeholder.textContent = caption.textContent;
      placeholder.style.fontFamily = computedFont;
      placeholder.style.fontSize = capStyle.fontSize;
      placeholder.style.color = capStyle.color;
      placeholder.style.textAlign = capStyle.textAlign || "center";
      placeholder.style.marginTop = capStyle.marginTop || "16px";
      placeholder.style.marginBottom = capStyle.marginBottom || "8px";

      // Insert after the table (or before if caption-side is top)
      if (capStyle.captionSide === "top") {
        table.parentElement?.insertBefore(placeholder, table);
      } else {
        table.parentElement?.insertBefore(placeholder, table.nextSibling);
      }

      caption.style.display = "none";
      restoredCaptions.push({ table, caption, placeholder });
    });

    try {
      const dataUrl = await toJpeg(node, {
        quality: 0.95,
        pixelRatio: 2,
        cacheBust: true,
        width: node.scrollWidth,
        height: node.scrollHeight,
        // Force the resolved font onto the SVG foreignObject root
        style: {
          fontFamily: computedFont,
        },
        filter: (domNode: HTMLElement) => {
          if (domNode.classList?.contains("no-capture")) return false;
          if (domNode.dataset?.ignoreCapture === "true") return false;
          return true;
        },
      });

      const link = document.createElement("a");
      link.download = `ED Report ${new Date().toDateString()}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to generate report image:", error);
    } finally {
      // Restore captions and overflow styles immediately
      restoredCaptions.forEach(({ caption, placeholder }) => {
        caption.style.display = "";
        placeholder.remove();
      });
      scrollableEls.forEach((el, i) => {
        el.style.overflow = previousOverflows[i];
      });
      setLoading(false);
    }
  }

  return (
    <Button onClick={downloadElementAsImage} disabled={loading}>
      Download as Image {loading ? <Spinner /> : <DownloadIcon />}
    </Button>
  );
}
