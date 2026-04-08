import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0"
import { Resend } from "npm:resend"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))
const hookSecret = Deno.env.get("SEND_EMAIL_HOOK_SECRET")?.replace("v1,whsec_", "")

Deno.serve(async (req) => {
  const payload = await req.text()
  const headers = Object.fromEntries(req.headers)
  const wh = new Webhook(hookSecret!)

  try {
    // 1. Update the destructuringq to match the full email_data payload
    const { user, email_data } = wh.verify(payload, headers) as any

    // 2. Update the 'from' address to your verified domain
    // Example: 'My App <hello@yournewdomain.com>'
    const { error } = await resend.emails.send({
      from: 'Remind <remind@esuansing.com>', 
      to: [user.email],
      subject: 'Verify your email',
      // email_data.confirmation_url is the magic link provided by Supabase
      html: `
        <h1>Welcome to Your App!</h1>
        <p>Click the link below to verify your account:</p>
        <a href="${email_data.confirmation_url}">Confirm my account</a>
      `
    })

    if (error) throw error

    return new Response(JSON.stringify({ ok: true }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    })
  } catch (err) {
    console.error(err.message)
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 401, 
      headers: { 'Content-Type': 'application/json' } 
    })
  }
})