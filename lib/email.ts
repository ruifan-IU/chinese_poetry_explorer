import { Resend } from 'resend';

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email verification email to user
 */
export async function sendVerificationEmail(
  email: string,
  verificationToken: string
) {
  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  const verificationUrl = `${appUrl}/verify-email?token=${verificationToken}`;

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: '验证您的邮箱 - 中国诗词探索',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #18181b;
                font-size: 24px;
                margin-bottom: 20px;
              }
              p {
                color: #52525b;
                margin-bottom: 16px;
              }
              .button {
                display: inline-block;
                background-color: #18181b;
                color: #ffffff !important;
                text-decoration: none;
                padding: 12px 32px;
                border-radius: 6px;
                margin: 20px 0;
                font-weight: 500;
              }
              .button:hover {
                background-color: #27272a;
              }
              .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e4e4e7;
                color: #a1a1aa;
                font-size: 14px;
              }
              .code {
                background-color: #f4f4f5;
                padding: 2px 6px;
                border-radius: 4px;
                font-family: monospace;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>欢迎来到中国诗词探索！</h1>
              <p>感谢您注册我们的平台。请点击下面的按钮验证您的邮箱地址：</p>

              <a href="${verificationUrl}" class="button">验证邮箱</a>

              <p>或者复制以下链接到浏览器：</p>
              <p class="code">${verificationUrl}</p>

              <p>此链接将在24小时后过期。</p>

              <div class="footer">
                <p>如果您没有注册此账号，请忽略此邮件。</p>
                <p>此邮件由系统自动发送，请勿回复。</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send verification email:', error);
      return { success: false, error };
    }

    console.log('Verification email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error };
  }
}

/**
 * Send daily review reminder email to a user
 */
export async function sendReviewReminderEmail(
  email: string,
  userName: string | null,
  duePoems: Array<{ title: string; poet: string }>
) {
  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  const practiceUrl = `${appUrl}/memorization/practice`;

  const poemListHtml = duePoems
    .map(
      (poem) => `
        <li style="padding: 8px 0; border-bottom: 1px solid #e4e4e7;">
          <span style="font-weight: 500; color: #18181b;">${poem.title}</span>
          <span style="color: #71717a; margin-left: 8px;">— ${poem.poet}</span>
        </li>`
    )
    .join('');

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: `您有 ${duePoems.length} 首诗词待复习 - 中国诗词探索`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              h1 { color: #18181b; font-size: 24px; margin-bottom: 8px; }
              p { color: #52525b; margin-bottom: 16px; }
              ul { list-style: none; padding: 0; margin: 0 0 24px 0; }
              .button {
                display: inline-block;
                background-color: #9333ea;
                color: #ffffff !important;
                text-decoration: none;
                padding: 12px 32px;
                border-radius: 6px;
                margin: 8px 0 24px;
                font-weight: 500;
              }
              .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e4e4e7;
                color: #a1a1aa;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>今日诗词复习提醒</h1>
              <p>您好${userName ? `，${userName}` : ''}！以下 ${duePoems.length} 首诗词今日待复习：</p>

              <ul>${poemListHtml}</ul>

              <a href="${practiceUrl}" class="button">开始复习</a>

              <div class="footer">
                <p>坚持每日复习，让诗词永驻心间。</p>
                <p>此邮件由系统自动发送，请勿回复。</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send review reminder email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending review reminder email:', error);
    return { success: false, error };
  }
}

/**
 * Send password reset email (for future use)
 */
export async function sendPasswordResetEmail(
  email: string,
  resetToken: string
) {
  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: '重置密码 - 中国诗词探索',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #18181b;
                font-size: 24px;
                margin-bottom: 20px;
              }
              p {
                color: #52525b;
                margin-bottom: 16px;
              }
              .button {
                display: inline-block;
                background-color: #18181b;
                color: #ffffff !important;
                text-decoration: none;
                padding: 12px 32px;
                border-radius: 6px;
                margin: 20px 0;
                font-weight: 500;
              }
              .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e4e4e7;
                color: #a1a1aa;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>重置您的密码</h1>
              <p>我们收到了重置您账号密码的请求。</p>

              <a href="${resetUrl}" class="button">重置密码</a>

              <p>此链接将在1小时后过期。</p>

              <div class="footer">
                <p>如果您没有请求重置密码，请忽略此邮件。您的账号仍然安全。</p>
                <p>此邮件由系统自动发送，请勿回复。</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send password reset email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error };
  }
}
