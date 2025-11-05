import Logo from "@/shared/Logo";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#090040] text-white px-6 md:px-20 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Logo />
          </div>
          <div className="flex space-x-4 mb-4">
            <FaTwitter className="cursor-pointer" />
            <FaInstagram className="cursor-pointer" />
            <FaLinkedin className="cursor-pointer" />
          </div>
          <p>Lagos: 12, Admiralty Road, Lekki Phase 1</p>
          <p>London: 45 Kent St, London, EC2A</p>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-2">For Rent</h4>
          <ul className="text-sm space-y-1">
            <li>Lagos</li>
            <li>Abuja</li>
            <li>Rivers</li>
            <li>Oyo</li>
            <li>Ogun</li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-2">For Sale</h4>
          <ul className="text-sm space-y-1">
            <li>Lagos</li>
            <li>Abuja</li>
            <li>Rivers</li>
            <li>Oyo</li>
            <li>Ogun</li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-2">
            Subscribe to our newsletter
          </h4>
          <p className="text-sm text-gray-400 mb-2">
            Stay updated with real estate trends in Nigeria.
          </p>
          <form className="flex items-center border border-white rounded overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 text-black focus:outline-none w-full"
            />
            <button
              type="submit"
              className="bg-white text-black px-3 py-2 flex items-center"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-xs text-gray-400 grid grid-cols-2 sm:flex justify-between">
        <p>About Us</p>
        <p>Contact</p>
        <p>FAQs</p>
        <p>Blog</p>
        <p>Privacy Policy</p>
        <p>Terms</p>
        <p>Disclaimer</p>
      </div>
    </footer>
  );
}
