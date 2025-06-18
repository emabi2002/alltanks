// Email notification system for All Tanks Limited
// This would integrate with a real email service like SendGrid, Mailgun, or AWS SES

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[];
}

export interface NotificationData {
  to: string;
  templateId: string;
  variables: Record<string, string | number>;
  priority?: 'low' | 'normal' | 'high';
}

export interface OrderNotificationData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  orderTotal: number;
  orderDate: string;
  orderStatus: string;
  items: Array<{
    name: string;
    quantity: number;
    color: string;
    price: number;
  }>;
  shippingAddress: string;
  estimatedDelivery?: string;
}

export interface QuoteNotificationData {
  quoteNumber: string;
  customerName: string;
  customerEmail: string;
  quoteTotal: number;
  quoteDate: string;
  expiryDate: string;
  items: Array<{
    name: string;
    quantity: number;
    color: string;
    price: number;
  }>;
}

// Email templates
export const emailTemplates: EmailTemplate[] = [
  {
    id: 'order-confirmation',
    name: 'Order Confirmation',
    subject: 'Order Confirmation - {{orderNumber}} | All Tanks Limited',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(to right, #2563eb, #1e40af); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">All Tanks Limited</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Built to Last. Engineered for the Tropics.</p>
        </div>

        <div style="padding: 30px 20px;">
          <h2 style="color: #1e40af;">Order Confirmation</h2>
          <p>Dear {{customerName}},</p>
          <p>Thank you for your order! We're pleased to confirm that your order has been received and is being processed.</p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Order Details</h3>
            <p><strong>Order Number:</strong> {{orderNumber}}</p>
            <p><strong>Order Date:</strong> {{orderDate}}</p>
            <p><strong>Total Amount:</strong> K{{orderTotal}}</p>
          </div>

          <h3>Items Ordered:</h3>
          <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            {{#each items}}
            <div style="padding: 15px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between;">
              <div>
                <strong>{{name}}</strong><br>
                <small style="color: #6b7280;">Color: {{color}} | Quantity: {{quantity}}</small>
              </div>
              <div style="text-align: right;">
                <strong>K{{price}}</strong>
              </div>
            </div>
            {{/each}}
          </div>

          <div style="margin: 30px 0;">
            <h3>What happens next?</h3>
            <ul style="color: #4b5563;">
              <li>We'll begin production of your tank(s) immediately</li>
              <li>You'll receive regular updates on production progress</li>
              <li>Our team will contact you to schedule delivery</li>
              <li>Professional installation can be arranged if selected</li>
            </ul>
          </div>

          <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #1e40af;">Need Help?</h4>
            <p>Our customer service team is here to help:</p>
            <p><strong>Phone:</strong> +675 472 2XXX<br>
            <strong>Email:</strong> info@alltanks.com.pg<br>
            <strong>Hours:</strong> Monday - Friday: 8:00 AM - 5:00 PM</p>
          </div>
        </div>

        <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
          <p>Thank you for choosing All Tanks Limited</p>
          <p>Industrial Road, Malahang, Lae, Morobe Province, Papua New Guinea</p>
        </div>
      </div>
    `,
    textContent: `
      Order Confirmation - {{orderNumber}}

      Dear {{customerName}},

      Thank you for your order! We're pleased to confirm that your order has been received and is being processed.

      Order Details:
      - Order Number: {{orderNumber}}
      - Order Date: {{orderDate}}
      - Total Amount: K{{orderTotal}}

      Items Ordered:
      {{#each items}}
      - {{name}} ({{color}}) x{{quantity}} - K{{price}}
      {{/each}}

      What happens next?
      - We'll begin production of your tank(s) immediately
      - You'll receive regular updates on production progress
      - Our team will contact you to schedule delivery
      - Professional installation can be arranged if selected

      Need Help?
      Phone: +675 472 2XXX
      Email: info@alltanks.com.pg
      Hours: Monday - Friday: 8:00 AM - 5:00 PM

      Thank you for choosing All Tanks Limited
      Industrial Road, Malahang, Lae, Morobe Province, Papua New Guinea
    `,
    variables: ['customerName', 'orderNumber', 'orderDate', 'orderTotal', 'items']
  },
  {
    id: 'quote-ready',
    name: 'Quote Ready',
    subject: 'Your Quote is Ready - {{quoteNumber}} | All Tanks Limited',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(to right, #2563eb, #1e40af); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">All Tanks Limited</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Built to Last. Engineered for the Tropics.</p>
        </div>

        <div style="padding: 30px 20px;">
          <h2 style="color: #1e40af;">Your Quote is Ready!</h2>
          <p>Dear {{customerName}},</p>
          <p>Thank you for your interest in our premium tank solutions. Your customized quote is now ready for review.</p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Quote Details</h3>
            <p><strong>Quote Number:</strong> {{quoteNumber}}</p>
            <p><strong>Quote Date:</strong> {{quoteDate}}</p>
            <p><strong>Valid Until:</strong> {{expiryDate}}</p>
            <p><strong>Total Amount:</strong> K{{quoteTotal}}</p>
          </div>

          <h3>Quoted Items:</h3>
          <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            {{#each items}}
            <div style="padding: 15px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between;">
              <div>
                <strong>{{name}}</strong><br>
                <small style="color: #6b7280;">Color: {{color}} | Quantity: {{quantity}}</small>
              </div>
              <div style="text-align: right;">
                <strong>K{{price}}</strong>
              </div>
            </div>
            {{/each}}
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Accept Quote & Place Order
            </a>
          </div>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #92400e;">Quote Expires Soon!</h4>
            <p>This quote is valid until {{expiryDate}}. To secure these prices, please accept your quote before the expiry date.</p>
          </div>
        </div>

        <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
          <p>Questions about your quote? Contact us anytime!</p>
          <p>Phone: +675 472 2XXX | Email: info@alltanks.com.pg</p>
        </div>
      </div>
    `,
    textContent: `
      Your Quote is Ready - {{quoteNumber}}

      Dear {{customerName}},

      Thank you for your interest in our premium tank solutions. Your customized quote is now ready for review.

      Quote Details:
      - Quote Number: {{quoteNumber}}
      - Quote Date: {{quoteDate}}
      - Valid Until: {{expiryDate}}
      - Total Amount: K{{quoteTotal}}

      Quoted Items:
      {{#each items}}
      - {{name}} ({{color}}) x{{quantity}} - K{{price}}
      {{/each}}

      This quote is valid until {{expiryDate}}. To secure these prices, please accept your quote before the expiry date.

      Questions about your quote? Contact us anytime!
      Phone: +675 472 2XXX
      Email: info@alltanks.com.pg
    `,
    variables: ['customerName', 'quoteNumber', 'quoteDate', 'expiryDate', 'quoteTotal', 'items']
  },
  {
    id: 'order-status-update',
    name: 'Order Status Update',
    subject: 'Order Update - {{orderNumber}} is now {{orderStatus}} | All Tanks Limited',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(to right, #2563eb, #1e40af); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">All Tanks Limited</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Built to Last. Engineered for the Tropics.</p>
        </div>

        <div style="padding: 30px 20px;">
          <h2 style="color: #1e40af;">Order Status Update</h2>
          <p>Dear {{customerName}},</p>
          <p>We have an update on your order {{orderNumber}}.</p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="margin-top: 0;">Current Status</h3>
            <div style="background: #10b981; color: white; padding: 10px 20px; border-radius: 6px; display: inline-block; font-weight: bold;">
              {{orderStatus}}
            </div>
          </div>

          {{#if estimatedDelivery}}
          <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #1e40af;">Estimated Delivery</h4>
            <p>Your order is expected to be delivered on: <strong>{{estimatedDelivery}}</strong></p>
          </div>
          {{/if}}

          <div style="margin: 30px 0;">
            <h3>Order Summary</h3>
            <p><strong>Order Number:</strong> {{orderNumber}}</p>
            <p><strong>Order Total:</strong> K{{orderTotal}}</p>
            <p><strong>Delivery Address:</strong> {{shippingAddress}}</p>
          </div>
        </div>

        <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
          <p>Track your order anytime at alltanks.com.pg</p>
          <p>Questions? Call us at +675 472 2XXX</p>
        </div>
      </div>
    `,
    textContent: `
      Order Status Update - {{orderNumber}}

      Dear {{customerName}},

      We have an update on your order {{orderNumber}}.

      Current Status: {{orderStatus}}

      {{#if estimatedDelivery}}
      Estimated Delivery: {{estimatedDelivery}}
      {{/if}}

      Order Summary:
      - Order Number: {{orderNumber}}
      - Order Total: K{{orderTotal}}
      - Delivery Address: {{shippingAddress}}

      Track your order anytime at alltanks.com.pg
      Questions? Call us at +675 472 2XXX
    `,
    variables: ['customerName', 'orderNumber', 'orderStatus', 'orderTotal', 'shippingAddress', 'estimatedDelivery']
  }
];

// Mock email service implementation
class EmailService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async sendEmail(data: NotificationData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // In a real implementation, this would call a real email service API
      console.log('📧 Sending email:', {
        to: data.to,
        templateId: data.templateId,
        variables: data.variables,
        priority: data.priority || 'normal'
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate success (in real implementation, this would be an actual API call)
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        success: true,
        messageId
      };
    } catch (error) {
      console.error('Failed to send email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async sendBulkEmails(emails: NotificationData[]): Promise<Array<{ success: boolean; messageId?: string; error?: string }>> {
    const results = [];

    for (const email of emails) {
      const result = await this.sendEmail(email);
      results.push(result);
    }

    return results;
  }
}

// Initialize email service (in production, use environment variables)
const emailService = new EmailService(
  process.env.EMAIL_API_KEY || 'demo-key',
  process.env.EMAIL_API_URL || 'https://api.emailservice.com'
);

// Helper functions to send specific types of notifications
export async function sendOrderConfirmation(orderData: OrderNotificationData): Promise<{ success: boolean; error?: string }> {
  const emailData: NotificationData = {
    to: orderData.customerEmail,
    templateId: 'order-confirmation',
    variables: {
      customerName: orderData.customerName,
      orderNumber: orderData.orderNumber,
      orderDate: orderData.orderDate,
      orderTotal: orderData.orderTotal.toLocaleString(),
      shippingAddress: orderData.shippingAddress
    },
    priority: 'high'
  };

  const result = await emailService.sendEmail(emailData);
  return { success: result.success, error: result.error };
}

export async function sendQuoteReady(quoteData: QuoteNotificationData): Promise<{ success: boolean; error?: string }> {
  const emailData: NotificationData = {
    to: quoteData.customerEmail,
    templateId: 'quote-ready',
    variables: {
      customerName: quoteData.customerName,
      quoteNumber: quoteData.quoteNumber,
      quoteDate: quoteData.quoteDate,
      expiryDate: quoteData.expiryDate,
      quoteTotal: quoteData.quoteTotal.toLocaleString()
    },
    priority: 'normal'
  };

  const result = await emailService.sendEmail(emailData);
  return { success: result.success, error: result.error };
}

export async function sendOrderStatusUpdate(
  orderData: OrderNotificationData
): Promise<{ success: boolean; error?: string }> {
  const emailData: NotificationData = {
    to: orderData.customerEmail,
    templateId: 'order-status-update',
    variables: {
      customerName: orderData.customerName,
      orderNumber: orderData.orderNumber,
      orderStatus: orderData.orderStatus,
      orderTotal: orderData.orderTotal.toLocaleString(),
      shippingAddress: orderData.shippingAddress,
      estimatedDelivery: orderData.estimatedDelivery || ''
    },
    priority: 'normal'
  };

  const result = await emailService.sendEmail(emailData);
  return { success: result.success, error: result.error };
}

// SMS notification placeholder (for future implementation)
export async function sendSMSNotification(
  phoneNumber: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  console.log('📱 SMS notification:', { phoneNumber, message });

  // Placeholder for SMS service integration
  return { success: true };
}

// Notification preferences management
export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
}

export function getDefaultNotificationPreferences(): NotificationPreferences {
  return {
    email: true,
    sms: true,
    orderUpdates: true,
    promotions: false,
    newsletter: false
  };
}

export function shouldSendNotification(
  type: 'order' | 'quote' | 'promotion' | 'newsletter',
  preferences: NotificationPreferences
): boolean {
  switch (type) {
    case 'order':
      return preferences.orderUpdates;
    case 'quote':
      return preferences.email;
    case 'promotion':
      return preferences.promotions;
    case 'newsletter':
      return preferences.newsletter;
    default:
      return false;
  }
}

export { emailService };
