import { google } from "googleapis";

/**
 * Client de escrita no Google Sheets autenticado via conta de serviço.
 * Sem Google Forms, sem Zapier/Make: apenas a API oficial do Google.
 * Credenciais vêm de variáveis de ambiente na Vercel, nunca do código.
 */
function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !key) {
    throw new Error(
      "Credenciais do Google Service Account não configuradas (GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY)."
    );
  }

  return new google.auth.JWT({
    email,
    key: key.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendRow(sheetName: string, row: (string | number | boolean)[]) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID não configurado.");
  }

  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [row.map((value) => (typeof value === "boolean" ? (value ? "Sim" : "Não") : value))],
    },
  });
}
