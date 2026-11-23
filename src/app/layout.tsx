import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benavente Gastrobar | La tradición tiene otro sabor (Sevilla)",
  description: "Cocina con personalidad, platos para compartir y ese punto canalla que hace volver. Gastrobar en Sevilla con propuesta gastronómica cuidada y contemporánea.",
  keywords: ["Benavente Gastrobar", "Gastrobar Sevilla", "Tapas Sevilla", "Cocina andaluza moderna", "Restaurante Sevilla"],
  openGraph: {
    title: "Benavente Gastrobar — Cocina con personalidad en Sevilla",
    description: "La tradición tiene otro sabor. Descubre nuestra carta de tapas de autor, especialidades y reserva tu mesa.",
    url: "https://benaventegastrobar.es",
    siteName: "Benavente Gastrobar",
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
