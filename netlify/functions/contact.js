export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    let body;

    // If content-type is JSON, parse JSON
    if (event.headers["content-type"]?.includes("application/json")) {
      body = JSON.parse(event.body);
    } else {
      // Otherwise parse form-urlencoded
      body = Object.fromEntries(new URLSearchParams(event.body));
    }

    const response = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (result.ok) {
      window.location.href = "/thanks.html";
    }
    else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Something went wrong", details: result }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong", details: err.message }),
    };
  }
}
