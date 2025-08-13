document.getElementById("submit_user_info").onclick = function () {
  const input = document.getElementById("user_info").value;

  const accountMatch = input.match(/ACCOUNT([\s\S]*?)INSTALLATION/i);
  const installationMatch = input.match(/INSTALLATION([\s\S]*?)Profiles/i);

  const accountText = accountMatch ? accountMatch[1] : "";
  const installationText = installationMatch ? installationMatch[1] : "";

  function extractField(field, text) {
    const re = new RegExp(field + ":\\s*(.*)", "i");
    const m = text.match(re);
    return m ? m[1].trim() : "";
  }

  let rawName = extractField("Name", accountText);
  rawName = rawName.replace(/\([^)]*\)/g, "").trim();
  rawName = rawName.replace(/,\s*BR$/i, "").trim();

  let rawUsername = extractField("Account", accountText);
  let rawEmail = extractField("eMail address", accountText);

  let rawPassword = extractField("First Password", installationText);
  let rawDate = extractField("Installation Date", installationText);

  function formatDate(d) {
    if (!d) return "";
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(d)) return d;
    const m = d.match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
    if (m) {
      let day = m[3].padStart(2, "0");
      let month = m[2].padStart(2, "0");
      let year = m[1];
      return `${day}/${month}/${year}`;
    }
    return d;
  }
  rawDate = formatDate(rawDate);

  const tokens = rawName.split(/\s+/).filter(Boolean);
  let name = "";
  let surname = "";

  if (tokens.length <= 1) {
    name = tokens[0] || "";
  } else if (tokens.length >= 2) {
    name = tokens[1];
    const restSurnameTokens = tokens.slice(2);
    restSurnameTokens.push(tokens[0]);
    surname = restSurnameTokens.join(" ");
  }

  let type = "EMPLOYEE";
  const unameLower = rawUsername.toLowerCase();
  if (unameLower.startsWith("st")) {
    type = "STAG";
  } else if (unameLower.startsWith("ex")) {
    type = "EXTERNAL";
  }

  document.getElementById("user_name").textContent = name;
  document.getElementById("user_surname").textContent = surname;
  document.getElementById("user_role").textContent = type;
  document.getElementById("user_username").textContent = rawUsername;
  document.getElementById("user_email").textContent = rawEmail;
  document.getElementById("user_password").textContent = rawPassword;
  document.getElementById("user_creation_date").textContent = rawDate;
// Preenche a tabela (mesma ordem do bloco infos)
document.getElementById("t-name").textContent = name;
document.getElementById("t-surname").textContent = surname;
document.getElementById("t-role").textContent = type;
document.getElementById("t-username").textContent = rawUsername;
document.getElementById("t-email").textContent = rawEmail;
document.getElementById("t-password").textContent = rawPassword;
document.getElementById("t-creationDate").textContent = rawDate;

};

document.getElementById("clear").onclick = function () {
  // limpa textarea
  document.getElementById("user_info").value = "";

  // limpa bloco infos
  document.querySelectorAll("#infos span").forEach(span => {
    span.textContent = "";
  });

  // limpa tabela
  document.querySelectorAll("#infos-table td").forEach(td => {
    td.textContent = "";
  });
};
