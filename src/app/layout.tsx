import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benavente Gastrobar — La tradición tiene otro sabor",
  description: "Gastrobar en Sevilla. Cocina andaluza tradicional con toques creativos, tapas para compartir y una propuesta gastronómica con personalidad. Consulta nuestra carta digital.",
  keywords: ["Benavente Gastrobar", "Gastrobar Sevilla", "Tapas Sevilla", "Carta Digital", "Cocina Andaluza", "Restaurante Sevilla Este"],
  metadataBase: new URL("https://benavente2.vercel.app"),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Benavente Gastrobar — La tradición tiene otro sabor",
    description: "Cocina con personalidad, platos para compartir y ese punto canalla que hace volver. Carta digital interactiva.",
    url: "https://benavente2.vercel.app/",
    siteName: "Benavente Gastrobar",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className="h-full antialiased selection:bg-[#89957C]/30 selection:text-[#344536]"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FCFAF5] text-[#252923]">
        {children}
      </body>
    </html>
  );
}
