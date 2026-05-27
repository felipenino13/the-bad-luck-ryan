const ALLOWED_IMAGE_HOST = "cdn.uploadtourl.com";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const imageUrl = requestUrl.searchParams.get("url");

  if (!imageUrl) {
    return new Response("Missing image URL", { status: 400 });
  }

  let parsedImageUrl: URL;

  try {
    parsedImageUrl = new URL(imageUrl);
  } catch {
    return new Response("Invalid image URL", { status: 400 });
  }

  if (
    parsedImageUrl.protocol !== "https:" ||
    parsedImageUrl.hostname !== ALLOWED_IMAGE_HOST
  ) {
    return new Response("Image host is not allowed", { status: 400 });
  }

  const imageResponse = await fetch(parsedImageUrl, {
    cache: "no-store",
    headers: {
      Accept: "image/*",
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!imageResponse.ok) {
    return new Response("Image could not be loaded", {
      status: imageResponse.status,
    });
  }

  const contentType =
    imageResponse.headers.get("content-type") ?? "image/png";
  const imageBody = await imageResponse.arrayBuffer();

  return new Response(imageBody, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": contentType,
    },
  });
}
