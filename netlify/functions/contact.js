export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);

    const response = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong", details: err.message }),
    };
  }
}