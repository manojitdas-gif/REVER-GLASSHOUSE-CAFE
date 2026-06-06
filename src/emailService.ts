import emailjs from '@emailjs/browser';

/* ================================================================
   EMAILJS CONFIGURATION — ALL KEYS SET ✅
   ================================================================ */
export const EMAILJS_CONFIG = {
  PUBLIC_KEY:          'A9TcNNlHQk5SV4FzO',
  SERVICE_ID:          'service_c3q04zp',
  COMPANY_TEMPLATE_ID: 'template_3e4znps',  // Lead details → growthlytics23@gmail.com
  USER_TEMPLATE_ID:    'template_tes9vec',  // Acknowledgement → user's email
};

export interface LeadData {
  formType: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  websiteUrl?: string;
  service?: string;
  budget?: string;
  message?: string;
  overview?: string;
}

/**
 * Sends TWO emails on form submission:
 * 1. Full lead details → growthlytics23@gmail.com
 * 2. Acknowledgement  → user's email
 */
export async function sendLeadEmails(data: LeadData): Promise<void> {
  const serviceMessage = data.message || data.overview || 'No additional message.';
  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  // ── Shared params used by BOTH templates ──────────────────────
  // We include fallback keys (like 'name', 'email') so that templates match
  // regardless of which naming convention was chosen in EmailJS.
  const templateParams = {
    // Standard variables
    from_name:    data.name,
    from_email:   data.email,
    reply_to:     data.email,
    form_type:    data.formType,
    service:      data.service || 'General Inquiry',
    budget:       data.budget  || 'Not specified',
    message:      serviceMessage,
    submitted_at: submittedAt,

    // Recipient variables
    to_name:  data.name,
    to_email: data.email,

    // Fallbacks and extra fields
    name:          data.name,
    email:         data.email,
    user_name:     data.name,
    user_email:    data.email,
    company_email: 'growthlytics23@gmail.com',
    message_html:  serviceMessage,
    overview:      data.overview || serviceMessage,
    challenge:     serviceMessage,
  };

  console.log('[EmailJS] Sending emails with params:', templateParams);

  try {
    // 1️⃣ Send lead details to company (passing publicKey in options object)
    const companyResult = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.COMPANY_TEMPLATE_ID,
      templateParams,
      { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
    );
    console.log('[EmailJS] Company email sent ✅', companyResult.status, companyResult.text);
  } catch (err: any) {
    console.error('[EmailJS] Company email FAILED ❌', err);
    throw new Error(`Company email failed: ${err?.text || err?.message || JSON.stringify(err)}`);
  }

  try {
    // 2️⃣ Send acknowledgement to user (passing publicKey in options object)
    const userResult = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.USER_TEMPLATE_ID,
      templateParams,
      { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
    );
    console.log('[EmailJS] User ack email sent ✅', userResult.status, userResult.text);
  } catch (err: any) {
    // Don't block success if user ack fails — company already got the lead
    console.warn('[EmailJS] User ack email FAILED (non-critical) ❌', err);
  }
}
