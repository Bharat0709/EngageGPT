import Logo from '../../assets/images/EngageGPTLogoIocn.png';
import { footerSections } from '../../assets/data/footerData';
import { Socials } from './Socials';

function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#004182] text-white m-4 rounded-lg py-10">
      <div className="container mx-auto px-4 lg:px-16 flex flex-col lg:flex-row justify-between items-start">
        {/* Logo Section */}
        <div className="mb-6 lg:mb-0 flex flex-col items-start">
          <div
            className="flex items-center cursor-pointer mb-4"
            onClick={() => scrollToSection('home')}
          >
            <img src={Logo} alt="EngageGPT Logo" className="h-14 mr-3" />
            <span className="text-2xl">EngageGPT</span>
          </div>
          <p className="text-sm text-gray-300 max-w-xs">
            Empowering LinkedIn networking with AI-driven engagement.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full lg:w-auto">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    {link.icon ? (
                      <a
                        href={link.href}
                        target={link.target || '_self'}
                        rel={link.rel || undefined}
                        className="flex items-center text-gray-300 hover:text-white transition"
                      >
                        <link.icon className="h-5 w-5 mr-2" />
                        {link.label}
                      </a>
                    ) : link.section ? (
                      <p
                        onClick={() => scrollToSection(link.section)}
                        className="cursor-pointer text-gray-300 hover:text-white transition"
                      >
                        {link.label}
                      </p>
                    ) : (
                      <a
                        href={link.href}
                        target={link.target || '_self'}
                        rel={link.rel || undefined}
                        className="text-gray-300 hover:text-white transition"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Socials Section */}
        <div className="mt-6 lg:mt-0">
          <Socials />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-500 mt-8 pt-6 text-center text-gray-300 text-2xl">
        <p>Made with ❤️ in India</p>
      </div>
    </footer>
  );
}

export default Footer;
