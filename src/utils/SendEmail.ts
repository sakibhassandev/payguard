import { resend } from "@/lib/resend";
import PaymentStatusChanged from "@/emails/PaymentStatusChange";
import { ApiResponse } from "@/utils/ApiResponse";

export async function sendVerificationEmail(
  name: string,
  email: string,
  status: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "PayGuard | Status Changed",
      react: PaymentStatusChanged({ name, status }),
    });

    return {
      success: true,
      message: "Email sent successfully",
      status: 200,
    };
  } catch (emailErr) {
    console.log("Error sending email: ", emailErr);
    return {
      success: false,
      message: "Error sending email",
      status: 500,
    };
  }
}
