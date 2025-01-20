import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2C3141] text-white py-8 sm:py-6">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-8 lg:px-16">
        {/* Section 1: Address */}
        <div className="flex flex-col items-center md:items-start">
          {/* Logo */}
          <img
            src="/assets/logorbn.png" // Ganti dengan path/logo Anda
            alt="Logo Rumah Belajar NTB"
            className="w-12 h-12 mb-4"
          />
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center md:text-left">
            Rumah Belajar NTB
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-center md:text-left break-words">
            Jl. Pendidikan No.19A, Gomong <br />
            Kec. Selaparang, Kota Mataram, Nusa Tenggara Barat. 83125
          </p>
        </div>

        {/* Section 2: Menu */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center md:text-left">
            Menu
          </h3>
          <ul className="space-y-2 text-sm sm:text-base text-center md:text-left">
            <li className="hover:text-gray-300 transition duration-200 cursor-pointer">
              Beranda
            </li>
            <li className="hover:text-gray-300 transition duration-200 cursor-pointer">
              Daftar Konten
            </li>
          </ul>
        </div>

        {/* Section 3: Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center md:text-left">
            Media Sosial Kami
          </h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="flex items-center">
              <a
                href="https://www.instagram.com/btidpdikbudntb/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <FaInstagram className="mr-3 text-lg sm:text-xl" />
                <span className="hover:text-gray-300 hover:underline transition duration-200">
                  @btidpdikbudntb
                </span>
              </a>
            </li>
            <li className="flex items-center">
              <a
                href="https://www.youtube.com/@btidpntbchannel4371"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <FaYoutube className="mr-3 text-lg sm:text-xl" />
                <span className="hover:text-gray-300 hover:underline transition duration-200">
                  BTIDP NTB Channel
                </span>
              </a>
            </li>
            <li className="flex items-center">
              <a
                href="https://web.facebook.com/balai.bptpntb.9/?_rdc=1&_rdr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <FaFacebook className="mr-3 text-lg sm:text-xl" />
                <span className="hover:text-gray-300 hover:underline transition duration-200">
                  Btidp Dikbud Ntb
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="border-t border-gray-700 mt-8 lg:mt-12"></div>
    </footer>
  );
};

export default Footer;
