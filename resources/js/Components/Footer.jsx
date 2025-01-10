import { FaInstagram, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa"; // Import ikon dari react-icons

const Footer = () => {
  return (
    <footer className="bg-[#2C3141] text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 lg:px-16">
        {/* Section 1: Address */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center md:text-left">
            Rumah Belajar NTB
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-center md:text-left">
            Jl. RE Martadinata No.KM. 15.5, Cipayung <br />
            Kec. Ciputat Kota Tangerang Selatan, Banten 15411
          </p>
        </div>

        {/* Section 2: Menu */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center md:text-left">
            Menu
          </h3>
          <ul className="space-y-2 text-sm sm:text-base text-center md:text-left">
            <li>Beranda</li>
            <li>Daftar Konten</li>
          </ul>
        </div>

        {/* Section 3: Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center md:text-left">
            Media Sosial Kami
          </h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="flex items-center">
              <FaInstagram className="mr-3 text-lg sm:text-xl" /> @btidpdikbudntb
            </li>
            <li className="flex items-center">
              <FaYoutube className="mr-3 text-lg sm:text-xl" /> BTIDP NTB Channel
            </li>
            <li className="flex items-center">
              <FaFacebook className="mr-3 text-lg sm:text-xl" /> Btidp Dikbud Ntb
            </li>
            <li className="flex items-center">
              <FaTwitter className="mr-3 text-lg sm:text-xl" /> @pusdatin_dikbud
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
