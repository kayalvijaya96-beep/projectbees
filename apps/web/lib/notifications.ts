export interface SendNotificationOptions {
  userId?: string;
  email?: string;
  phone?: string;
  type: 'order_confirmed' | 'payment_confirmed' | 'order_shipped' | 'order_delivered' | 'order_cancelled';
  title: string;
  message: string;
  metadata?: Record<string, any>;
}

export class NotificationService {
  private resendApiKey = process.env.RESEND_API_KEY || '';
  private fromEmail = process.env.EMAIL_FROM || 'orders@projectbee.in';

  /**
   * Dispatches email notification using Resend REST API or logs if not configured
   */
  async sendEmail(to: string, subject: string, htmlContent: string): Promise<{ success: boolean; id?: string }> {
    if (!this.resendApiKey) {
      console.log(`[NOTIFICATION_MOCK] Email sent to: ${to} | Subject: ${subject}`);
      return { success: true, id: `mock_email_${Date.now()}` };
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.resendApiKey}`,
        },
        body: JSON.stringify({
          from: this.fromEmail,
          to: [to],
          subject,
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[RESEND_ERROR]', errorText);
        return { success: false };
      }

      const data = await response.json();
      return { success: true, id: data.id };
    } catch (err) {
      console.error('[EMAIL_SEND_FAILED]', err);
      return { success: false };
    }
  }

  /**
   * Formats and dispatches notification based on order lifecycle
   */
  async notifyOrderEvent(options: SendNotificationOptions) {
    if (options.email) {
      const subject = `[ProjectBee] ${options.title}`;
      const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #173B67;">${options.title}</h2>
          <p style="color: #263447; line-height: 1.6;">${options.message}</p>
          ${
            options.metadata?.orderNumber
              ? `<p><strong>Order Reference:</strong> ${options.metadata.orderNumber}</p>`
              : ''
          }
          ${
            options.metadata?.totalAmount
              ? `<p><strong>Total Amount:</strong> ₹${options.metadata.totalAmount}</p>`
              : ''
          }
          ${
            options.metadata?.trackingNumber
              ? `<p><strong>Tracking Number:</strong> ${options.metadata.trackingNumber}</p>`
              : ''
          }
          <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
          <p style="color: #68778A; font-size: 12px;">
            ProjectBee • Educational School Science Projects<br/>
            Bengaluru, Karnataka 560038
          </p>
        </div>
      `;
      await this.sendEmail(options.email, subject, html);
    }
  }
}

export const notificationService = new NotificationService();
