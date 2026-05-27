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
  error?: {
    code?: unknown;
    message?: unknown;
  };
  filename?: unknown;
  status?: unknown;
  url?: unknown;
};

function getWebhookErrorMessage(data: unknown) {
  const payload = Array.isArray(data) ? data[0] : data;

  if (!payload || typeof payload !== "object") {
    return "";
  }

  const error = "error" in payload ? payload.error : null;

  if (!error || typeof error !== "object") {
    return "";
  }

  const code = "code" in error ? error.code : "";
  const message = "message" in error ? error.message : "";

  if (code === "billing_hard_limit_reached") {
    return "No se pudo generar la imagen porque la cuenta de OpenAI llego al limite de facturacion.";
  }

  return typeof message === "string"
    ? `No se pudo generar la imagen: ${message}`
    : "";
}

async function readWebhookResponse(response: Response) {
  const responseText = await response.text();

  if (!responseText) {
    return null;
  }

  try {
    return JSON.parse(responseText) as
      | WebhookImageResponse
      | WebhookImageResponse[];
  } catch {
    return responseText;
  }
}

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

  try {
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

    const data = await readWebhookResponse(response);
    const webhookErrorMessage = getWebhookErrorMessage(data);

    if (!response.ok) {
      return {
        message:
          webhookErrorMessage ||
          "No se pudo generar la imagen. Revisa el flujo de n8n e intenta de nuevo.",
        status: "error",
      };
    }

    if (webhookErrorMessage) {
      return {
        message: webhookErrorMessage,
        status: "error",
      };
    }

    const result = Array.isArray(data) ? data[0] : data;
    const imageUrl =
      result && typeof result === "object" && typeof result.url === "string"
        ? result.url
        : "";
    const filename =
      result && typeof result === "object" && typeof result.filename === "string"
        ? result.filename
        : "bad-luck-ryan.png";

    if (!imageUrl) {
      return {
        message: "n8n respondio, pero no devolvio una URL de imagen.",
        status: "error",
      };
    }

    return {
      filename,
      imageUrl,
      message: "Imagen generada.",
      status: "success",
    };
  } catch {
    return {
      message:
        "No se pudo conectar con n8n. Revisa que el workflow este activo e intenta de nuevo.",
      status: "error",
    };
  }
}
