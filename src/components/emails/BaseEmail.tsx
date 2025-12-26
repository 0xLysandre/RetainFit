import { Html, Head, Body, Container } from '@react-email/components';

interface BaseEmailProps {
  children: React.ReactNode;
  preview?: string;
}

export function BaseEmail({ children, preview }: BaseEmailProps) {
  return (
    <Html>
      <Head>
        {preview && <title>{preview}</title>}
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #374151;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .logo {
            color: white;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            background: white;
            padding: 40px;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: #10b981;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            font-size: 14px;
          }
        `}</style>
      </Head>
      <Body style={{ margin: 0, padding: 0, backgroundColor: '#f3f4f6' }}>
        <Container className="container">
          <div className="header">
            <div className="logo">RetainFit</div>
          </div>
          <div className="content">
            {children}
          </div>
          <div className="footer">
            <p>&copy; 2025 RetainFit. All rights reserved.</p>
            <p>
              <a href={`${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe`} style={{ color: '#6b7280', textDecoration: 'underline' }}>
                Unsubscribe
              </a>
            </p>
          </div>
        </Container>
      </Body>
    </Html>
  );
}