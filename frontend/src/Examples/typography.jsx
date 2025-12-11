//best typography example

import { useState } from "react";
import { X } from "lucide-react";

const TypographyExample = () => {
  const [isOpen, setIsOpen] = useState(true);
  //An advertisement card example
  //cheatcodes for good typography
  //1. Use a clear and legible font
  //2. Maintain a good contrast between text and background
  //3. Use hierarchy to guide the reader's eye
  //4. Keep line length between 50-75 characters for optimal readability
  //5. Use appropriate line spacing (1.5x the font size)
  //6. Limit the number of typefaces to 2-3 per design
  //7. Use bold and italics sparingly to emphasize important information
  //8. Ensure consistent alignment and spacing throughout the design
  //9. Use color to create emphasis and visual interest
  //10. Test your typography on different devices and screen sizes to ensure readability
  //11. Use whitespace effectively to avoid clutter and improve readability
  //12. Use padding and margins in multiple of 4 or 8 for better alignment
  //13. Use a maximum of 3 font sizes to create a clear hierarchy
  //14. Avoid using all caps for large blocks of text as it reduces readability

  return (
    <>

      {isOpen && (
        <div className="p-8 max-w-3xl mx-auto fixed left-[50%] transform -translate-x-[50%]  bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-6 mt-4 md:h-full h-screen overflow-y-auto">
            <div className="text-center mb-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              Discover the Future of AI with BigBite
            </h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
              BigBite is your gateway to cutting-edge AI technology. Whether
              you're a developer, researcher, or enthusiast, our platform offers
              a suite of tools and resources to help you harness the power of
              artificial intelligence.
            </p>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Why Choose BigBite?
            </h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed">
              <li>Comprehensive AI tools and libraries</li>
              <li>User-friendly interface for seamless navigation</li>
              <li>Regular updates with the latest AI advancements</li>
              <li>Supportive community and expert guidance</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Join thousands of users who are already leveraging BigBite to
              innovate and create. Whether you're building AI models, analyzing
              data, or exploring new algorithms, BigBite has everything you
              need to succeed.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TypographyExample;
