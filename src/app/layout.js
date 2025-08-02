import "./globals.css";

export const metadata = {
  title: "Doctor Finder",
  description: "Find and book the best doctors near you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <main>{children}</main>
      </body>
    </html>
  );
}