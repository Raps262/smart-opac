import { Phone, Mail, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import FooterSectionTitle from "./FooterSectionTitle";

const ContactItem = ({ icon: Icon, value, href }) => (
  <a
    href={href}
    className="flex items-center gap-2 px-3 py-2 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/30 rounded-lg text-xs text-slate-300 hover:text-white hover:border-slate-600 transition-all duration-200 group"
  >
    <Icon className="w-3.5 h-3.5 text-blue-500 group-hover:text-blue-400 transition-colors" />
    <span>{value}</span>
  </a>
);

const SocialButton = ({ icon: Icon, href, label, bgColor }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-9 h-9 rounded-lg ${bgColor} flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg text-white`}
    aria-label={label}
  >
    <Icon size={16} strokeWidth={2} />
  </a>
);

export default function FooterContact() {
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/stmikwicida", label: "Facebook", bgColor: "bg-blue-600 hover:bg-blue-500" },
    { icon: Instagram, href: "https://instagram.com/perpuswicida", label: "Instagram", bgColor: "bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500" },
    { icon: Youtube, href: "https://www.youtube.com/@stmik.wicida", label: "YouTube", bgColor: "bg-red-600 hover:bg-red-500" },
    { icon: Linkedin, href: "https://id.linkedin.com/school/wicida/", label: "LinkedIn", bgColor: "bg-blue-700 hover:bg-blue-600" },
  ];

  return (
    <section aria-labelledby="footer-contact">
      <FooterSectionTitle title="Kontak" id="footer-contact" />
      
      <div className="space-y-2.5 mb-6">
        <ContactItem icon={Phone} value="(0541) 736071" href="tel:+62541736071" />
        <ContactItem icon={Mail} value="admin@wicida.ac.id" href="mailto:admin@wicida.ac.id" />
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-400 mb-3">Media Sosial</p>
        <div className="flex gap-2">
          {socialLinks.map((social, index) => (
            <SocialButton key={index} {...social} />
          ))}
        </div>
      </div>
    </section>
  );
}