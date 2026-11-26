import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import type { CSSProperties } from "react"

const BRAND = {
  primary: "#4C5A3D",
  background: "#F5F2E8",
  sand: "#F5EFE6",
  leaf: "#E7F0DE",
  gold: "#CD9C16",
  stroke: "#D2CEC3",
  ink: "#111827",
  inkBody: "#374151",
  inkMuted: "#6D758F",
  white: "#FFFFFF",
} as const

const HEADING_FONT = "'Playfair Display', Georgia, 'Times New Roman', serif"
const BODY_FONT = "Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif"

export interface ContactInquiryEmailProps {
  fullName: string
  email: string
  phone: string
  topicLabel: string
  message: string
  receivedAt: string
}

export function ContactInquiryEmail({
  fullName,
  email,
  phone,
  topicLabel,
  message,
  receivedAt,
}: ContactInquiryEmailProps) {
  const replyHref = `mailto:${email}?subject=${encodeURIComponent(`Re: Your Avelliq inquiry (${topicLabel})`)}`
  const details = [
    { label: "Name", value: fullName },
    { label: "Email", value: email, href: `mailto:${email}` },
    { label: "Phone", value: phone || "Not provided", href: phone ? `tel:${phone}` : undefined },
    { label: "Received", value: receivedAt },
  ]

  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Playfair Display"
          fallbackFontFamily="Georgia"
          webFont={{
            url: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2",
            format: "woff2",
          }}
          fontWeight={500}
          fontStyle="normal"
        />
        <Font
          fontFamily="Montserrat"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{`${fullName} sent a new inquiry about ${topicLabel.toLowerCase()}`}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.wordmark}>Avelliq</Text>
            <Text style={styles.headerTagline}>Trusted care, thoughtfully matched</Text>
          </Section>

          <Section style={styles.card}>
            <Text style={styles.eyebrow}>New contact inquiry</Text>
            <Heading as="h1" style={styles.title}>
              A message from {fullName}
            </Heading>
            <Text style={styles.topicBadge}>{topicLabel}</Text>

            <Section style={styles.messageBlock}>
              <Text style={styles.messageText}>{message}</Text>
            </Section>

            <Hr style={styles.divider} />

            {details.map((detail) => (
              <Section key={detail.label} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{detail.label}</Text>
                <Text style={styles.detailValue}>
                  {detail.href ? (
                    <Link href={detail.href} style={styles.detailLink}>
                      {detail.value}
                    </Link>
                  ) : (
                    detail.value
                  )}
                </Text>
              </Section>
            ))}

            <Section style={styles.ctaSection}>
              <Button href={replyHref} style={styles.button}>
                Reply to {fullName.split(" ")[0]}
              </Button>
            </Section>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              This inquiry was submitted through the contact form on the Avelliq website. Replying
              to this email will respond directly to {email}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

ContactInquiryEmail.PreviewProps = {
  fullName: "Sarah Jenkins",
  email: "sarah@example.com",
  phone: "+1 (555) 000-0000",
  topicLabel: "Finding care",
  message:
    "Hi there, I am looking for a part-time nanny for my two children (ages 4 and 7) starting next month. Could someone walk me through how vetting works?",
  receivedAt: "Thursday, November 26, 2026 at 10:30 AM ET",
} satisfies ContactInquiryEmailProps

export default ContactInquiryEmail

const styles = {
  body: {
    margin: 0,
    padding: "32px 12px",
    backgroundColor: BRAND.background,
    fontFamily: BODY_FONT,
    color: BRAND.ink,
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
  },
  header: {
    backgroundColor: BRAND.primary,
    borderRadius: "16px 16px 0 0",
    padding: "28px 32px",
    textAlign: "center",
  },
  wordmark: {
    margin: 0,
    fontFamily: HEADING_FONT,
    fontSize: "30px",
    fontWeight: 500,
    lineHeight: "36px",
    letterSpacing: "0.5px",
    color: BRAND.white,
  },
  headerTagline: {
    margin: "6px 0 0",
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: BRAND.leaf,
  },
  card: {
    backgroundColor: BRAND.white,
    border: `1px solid ${BRAND.stroke}`,
    borderTop: "none",
    borderRadius: "0 0 16px 16px",
    padding: "32px",
  },
  eyebrow: {
    margin: 0,
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "18px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: BRAND.gold,
  },
  title: {
    margin: "8px 0 16px",
    fontFamily: HEADING_FONT,
    fontSize: "26px",
    fontWeight: 500,
    lineHeight: "34px",
    color: BRAND.primary,
  },
  topicBadge: {
    display: "inline-block",
    margin: "0 0 24px",
    padding: "6px 14px",
    borderRadius: "999px",
    backgroundColor: BRAND.leaf,
    fontSize: "13px",
    fontWeight: 600,
    lineHeight: "18px",
    color: BRAND.primary,
  },
  messageBlock: {
    backgroundColor: BRAND.sand,
    borderLeft: `3px solid ${BRAND.gold}`,
    borderRadius: "0 12px 12px 0",
    padding: "18px 20px",
  },
  messageText: {
    margin: 0,
    fontSize: "15px",
    lineHeight: "24px",
    color: BRAND.inkBody,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  divider: {
    margin: "28px 0 20px",
    borderColor: BRAND.stroke,
  },
  detailRow: {
    marginBottom: "14px",
  },
  detailLabel: {
    margin: 0,
    fontSize: "11px",
    fontWeight: 600,
    lineHeight: "16px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: BRAND.inkMuted,
  },
  detailValue: {
    margin: "2px 0 0",
    fontSize: "15px",
    lineHeight: "22px",
    color: BRAND.ink,
    wordBreak: "break-word",
  },
  detailLink: {
    color: BRAND.primary,
    textDecoration: "underline",
  },
  ctaSection: {
    marginTop: "28px",
    textAlign: "center",
  },
  button: {
    display: "inline-block",
    padding: "14px 32px",
    borderRadius: "999px",
    backgroundColor: BRAND.primary,
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "20px",
    color: BRAND.white,
    textDecoration: "none",
  },
  footer: {
    padding: "24px 16px 0",
    textAlign: "center",
  },
  footerText: {
    margin: 0,
    fontSize: "12px",
    lineHeight: "18px",
    color: BRAND.inkMuted,
  },
} satisfies Record<string, CSSProperties>
