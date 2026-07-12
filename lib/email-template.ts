export default function getEmailHtml(name: string, email: string, phone: string, date: string, time: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030305; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #030305; padding: 48px 20px;">
        <tr>
            <td align="center">

                <!-- Eyebrow tag above card -->
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="padding-bottom: 18px;">
                            <span style="font-size: 11px; font-weight: 700; letter-spacing: 2.5px; color: #6b6b8f; text-transform: uppercase;">Booking Engine · Live Alert</span>
                        </td>
                    </tr>
                </table>

                <!-- Main Container -->
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #08080d; border: 1px solid #1a1a2e; border-radius: 20px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,212,255,0.04);">

                    <!-- Top gradient accent bar -->
                    <tr>
                        <td style="height: 4px; background: linear-gradient(90deg, #00d4ff 0%, #7c3aed 55%, #ff4fd8 100%); font-size: 0; line-height: 0;">&nbsp;</td>
                    </tr>

                    <!-- Header with Logo -->
                    <tr>
                        <td align="center" style="padding: 44px 0 8px 0;">
                            <h1 style="margin: 0; font-size: 30px; font-weight: 800; letter-spacing: 3px; color: #ffffff;">
                                <span style="color: #00d4ff;">NEX</span>VRA
                            </h1>
                            <p style="margin: 6px 0 0 0; font-size: 11px; font-weight: 600; letter-spacing: 2px; color: #4a4a6a; text-transform: uppercase;">Digital Agency</p>
                        </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                        <td style="padding: 28px 40px 0 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-top: 1px solid #16162a; font-size:0; line-height:0;">&nbsp;</td></tr></table>
                        </td>
                    </tr>

                    <!-- Body Title + Status Pill -->
                    <tr>
                        <td align="center" style="padding: 30px 40px 6px 40px;">
                            <table cellpadding="0" cellspacing="0" style="margin: 0 auto 14px auto;">
                                <tr>
                                    <td style="background-color: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.25); border-radius: 20px; padding: 6px 16px;">
                                        <span style="font-size: 11px; font-weight: 700; letter-spacing: 1px; color: #00d4ff; text-transform: uppercase;">● New Lead Booked</span>
                                    </td>
                                </tr>
                            </table>
                            <h2 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: 0.3px;">
                                You've got a new call booked
                            </h2>
                        </td>
                    </tr>

                    <!-- Details Card -->
                    <tr>
                        <td style="padding: 24px 40px 8px 40px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(160deg, rgba(22,22,40,0.75) 0%, rgba(9,9,18,0.9) 100%); border: 1px solid rgba(0,212,255,0.14); border-radius: 14px;">

                                <tr>
                                    <td style="padding: 22px 24px; border-bottom: 1px solid #14142a;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="34" valign="top" style="padding-top: 2px;">
                                                    <span style="display:inline-block; width:26px; height:26px; line-height:26px; text-align:center; background-color: rgba(0,212,255,0.1); border-radius: 8px; font-size: 13px;">👤</span>
                                                </td>
                                                <td valign="middle">
                                                    <span style="font-size: 11px; font-weight: 600; color: #6b7bb8; text-transform: uppercase; letter-spacing: 1px; display: block;">Client Name</span>
                                                    <span style="font-size: 16px; font-weight: 600; color: #ffffff; display: block; margin-top: 3px;">${name}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 22px 24px; border-bottom: 1px solid #14142a;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="34" valign="top" style="padding-top: 2px;">
                                                    <span style="display:inline-block; width:26px; height:26px; line-height:26px; text-align:center; background-color: rgba(0,212,255,0.1); border-radius: 8px; font-size: 13px;">✉️</span>
                                                </td>
                                                <td valign="middle">
                                                    <span style="font-size: 11px; font-weight: 600; color: #6b7bb8; text-transform: uppercase; letter-spacing: 1px; display: block;">Email Address</span>
                                                    <span style="font-size: 16px; font-weight: 600; color: #ffffff; display: block; margin-top: 3px;">${email}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 22px 24px; border-bottom: 1px solid #14142a;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="34" valign="top" style="padding-top: 2px;">
                                                    <span style="display:inline-block; width:26px; height:26px; line-height:26px; text-align:center; background-color: rgba(0,212,255,0.1); border-radius: 8px; font-size: 13px;">📞</span>
                                                </td>
                                                <td valign="middle">
                                                    <span style="font-size: 11px; font-weight: 600; color: #6b7bb8; text-transform: uppercase; letter-spacing: 1px; display: block;">Phone Number</span>
                                                    <span style="font-size: 16px; font-weight: 600; color: #ffffff; display: block; margin-top: 3px;">${phone}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 22px 24px;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td width="50%" valign="top">
                                                    <table cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="34" valign="top" style="padding-top: 2px;">
                                                                <span style="display:inline-block; width:26px; height:26px; line-height:26px; text-align:center; background-color: rgba(124,58,237,0.12); border-radius: 8px; font-size: 13px;">📅</span>
                                                            </td>
                                                            <td valign="middle">
                                                                <span style="font-size: 11px; font-weight: 600; color: #a58bd8; text-transform: uppercase; letter-spacing: 1px; display: block;">Date</span>
                                                                <span style="font-size: 15px; font-weight: 600; color: #ffffff; display: block; margin-top: 3px;">${date}</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td width="50%" valign="top">
                                                    <table cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="34" valign="top" style="padding-top: 2px;">
                                                                <span style="display:inline-block; width:26px; height:26px; line-height:26px; text-align:center; background-color: rgba(124,58,237,0.12); border-radius: 8px; font-size: 13px;">🕒</span>
                                                            </td>
                                                            <td valign="middle">
                                                                <span style="font-size: 11px; font-weight: 600; color: #a58bd8; text-transform: uppercase; letter-spacing: 1px; display: block;">Time</span>
                                                                <span style="font-size: 15px; font-weight: 600; color: #ffffff; display: block; margin-top: 3px;">${time}</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>

                    <!-- Call To Action Button -->
                    <tr>
                        <td align="center" style="padding: 30px 40px 12px 40px;">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="border-radius: 30px; background: linear-gradient(90deg, #00d4ff 0%, #7c3aed 100%); box-shadow: 0 8px 24px rgba(0,212,255,0.28);">
                                        <a href="https://nexvra.in/crm" style="display: inline-block; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; letter-spacing: 0.6px; padding: 16px 38px;">
                                            View in CRM Dashboard →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Secondary link -->
                    <tr>
                        <td align="center" style="padding: 0 40px 40px 40px;">
                            <a href="tel:${phone}" style="font-size: 13px; font-weight: 600; color: #6b7bb8; text-decoration: none;">or call the lead directly →</a>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding: 24px 40px; background-color: #050508; border-top: 1px solid #111122;">
                            <p style="margin: 0 0 6px 0; font-size: 12px; color: #55557a;">
                                NEXVRA Digital &nbsp;·&nbsp; Bengaluru, India
                            </p>
                            <p style="margin: 0; font-size: 11px; color: #40405e;">
                                © 2026 NEXVRA. All rights reserved. &nbsp;·&nbsp; <a href="#" style="color: #55557a; text-decoration: underline;">Unsubscribe</a>
                            </p>
                        </td>
                    </tr>

                </table>

                <!-- Bottom tag -->
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="padding-top: 20px;">
                            <span style="font-size: 11px; color: #33334a;">Sent automatically by the NEXVRA booking engine</span>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>
</body>
</html>`;
}
