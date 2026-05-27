"use server";

const BAD_LUCK_WEBHOOK_URL =
  "https://n8n.crisnnino.com/webhook/the-bad-luck-ryan";

export type BadLuckSubmissionState = {
  filename?: string;
  imageUrl?: string;
  message: string;
  status: "idle" | "success" | "error";
};

type WebhookImageResponse = {
  filename?: unknown;
  status?: unknown;
  url?: unknown;
};

export async function submitBadLuckTeam(
  _previousState: BadLuckSubmissionState,
  formData: FormData,
): Promise<BadLuckSubmissionState> {
  const team = String(formData.get("team") ?? "").trim();
  const selectedTeamCode = String(formData.get("selectedTeamCode") ?? "").trim();
  const selectedTeamName = String(formData.get("selectedTeamName") ?? "").trim();

  if (!team) {
    return {
      message: "Escribe o selecciona un equipo antes de generar.",
      status: "error",
    };
  }

  const response = await fetch(BAD_LUCK_WEBHOOK_URL, {
    body: JSON.stringify({
      selectedTeamCode: selectedTeamCode || null,
      selectedTeamName: selectedTeamName || null,
      submittedAt: new Date().toISOString(),
      team,
    }),
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    return {
      message: "No se pudo enviar el equipo. Intenta de nuevo.",
      status: "error",
    };
  }

  const data = (await response.json()) as
    | WebhookImageResponse
    | WebhookImageResponse[];
  const result = Array.isArray(data) ? data[0] : data;
  const imageUrl = typeof result?.url === "string" ? result.url : "";
  const filename =
    typeof result?.filename === "string" ? result.filename : "bad-luck-ryan.png";

  if (!imageUrl) {
    return {
      message: "n8n respondió, pero no devolvió una URL de imagen.",
      status: "error",
    };
  }

  return {
    filename,
    imageUrl,
    message: "Imagen generada.",
    status: "success",
  };
}
