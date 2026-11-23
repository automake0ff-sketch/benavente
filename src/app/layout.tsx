import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benavente Gastrobar | Demo Comercial de Experiencia Digital",
  description: "Propuesta de microapp y carta digital interactiva para Benavente Gastrobar (Sevilla). Demostración comercial y prototipo funcional.",
  keywords: ["Benavente Gastrobar", "Gastrobar Sevilla", "Tapas Sevilla", "Carta Digital", "Demo Comercial"],
  metadataBase: new URL("https://benavente2.vercel.app"),
  openGraph: {
    title: "Benavente Gastrobar — Demo Comercial de Carta y Experiencia Digital",
    description: "La tradición tiene otro sabor. Prototipo funcional de carta interactiva, reservas y panel de control.",
    url: "https://benavente2.vercel.app/",
    siteName: "Benavente Gastrobar (Demo)",
    locale: "es_ES",
    type: "website",
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
