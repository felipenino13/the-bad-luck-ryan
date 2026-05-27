"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  type BadLuckSubmissionState,
  submitBadLuckTeam,
} from "./actions";
import TeamCombobox from "./TeamCombobox";

const initialState: BadLuckSubmissionState = {
  message: "",
  status: "idle",
};

function GenerateButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "ENVIANDO" : "GENERAR"}
    </button>
  );
}

function proxiedImageUrl(imageUrl: string) {
  return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
}

function GeneratedImage({ imageUrl }: { imageUrl: string }) {
  const [failedImageUrl, setFailedImageUrl] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const imageSrc =
    failedImageUrl === imageUrl ? proxiedImageUrl(imageUrl) : imageUrl;

  return (
    <div className="badluck-result__image">
      {!isLoaded ? (
        <div className="badluck-result__image-loader" aria-hidden="true">
          <div className="badluck-result__loader" />
        </div>
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt="Imagen generada de Bad Luck Ryan"
        decoding="async"
        fetchPriority="high"
        referrerPolicy="no-referrer"
        onError={() => setFailedImageUrl(imageUrl)}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

function GeneratedImagePreview({ state }: { state: BadLuckSubmissionState }) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <div className="badluck-result badluck-result--loading" aria-live="polite">
        <div className="badluck-result__loader" aria-hidden="true" />
        <p>Enviando solicitud y generando imagen...</p>
      </div>
    );
  }

  if (state.status === "success" && state.imageUrl) {
    return (
      <div
        className="badluck-result"
        aria-label={state.message}
        aria-live="polite"
      >
        <GeneratedImage key={state.imageUrl} imageUrl={state.imageUrl} />
      </div>
    );
  }

  if (state.status === "error" && state.message) {
    return (
      <p className="badluck-result badluck-result--error" aria-live="polite">
        {state.message}
      </p>
    );
  }

  return null;
}

function DownloadButton({ state }: { state: BadLuckSubmissionState }) {
  const { pending } = useFormStatus();
  const [isDownloading, setIsDownloading] = useState(false);
  const canDownload = Boolean(state.imageUrl) && !pending && !isDownloading;

  async function downloadImage() {
    if (!state.imageUrl) {
      return;
    }

    setIsDownloading(true);

    try {
      const response = await fetch(proxiedImageUrl(state.imageUrl));
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = state.filename ?? "bad-luck-ryan.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(proxiedImageUrl(state.imageUrl), "_blank", "noopener,noreferrer");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <button type="button" disabled={!canDownload} onClick={downloadImage}>
      {isDownloading ? "BAJANDO" : "DESCARGAR"}
    </button>
  );
}

export default function BadLuckForm() {
  const [state, formAction] = useActionState(submitBadLuckTeam, initialState);

  return (
    <form action={formAction} className="badluck-form">
      <GeneratedImagePreview state={state} />
      <TeamCombobox />

      <div className="badluck-actions">
        <GenerateButton />
        <DownloadButton state={state} />
      </div>

      <p className="sr-only" aria-live="polite">
        {state.message}
      </p>
    </form>
  );
}
