import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo_amnet.png"
                alt="Logo"
                width={200}
                height={200}
                className="bg-white p-4"
              />
            </Link>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/content" className="hover:underline">
                  Content
                </Link>
              </li>
              <li>
                <Link href="/statistics" className="hover:underline">
                  Statistics
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            {/* <h3 className="font-semibold mb-4">Best Practices</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/content" className="hover:underline">
                  Article
                </Link>
              </li>
              <li>
                <Link href="/content" className="hover:underline">
                  Video
                </Link>
              </li>
              <li>
                <Link href="/content" className="hover:underline">
                  Document
                </Link>
              </li>
            </ul> */}
          </div>
          <div>
            {/* <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-2 items-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline p-2 bg-green-900 rounded-full text-white "
              >
                <Facebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-green-900 rounded-full text-white"
              >
                <Twitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-green-900 rounded-full text-white"
              >
                <Instagram />
              </a>
            </div> */}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AMNET</p>
        </div>
      </div>
    </footer>
  );
}
