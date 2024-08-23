import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white py-6 w-full">
      <div className="container max-w-7xl flex flex-col md:flex-row px-4 md:px-6">

        {/* Merged Column 2 and 3 */}
        <div className="flex flex-col w-full md:w-2/5 mb-4 md:mb-0 ml-0">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-semibold">DevTrack</span>
          </div>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            optio excepturi, et qui voluptatibus odio velit dolorum autem illum
            deserunt? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, iure?
          </p>
        </div>

        {/* Empty Column 5 */}
        <div className="w-full md:w-1/5 mb-4 md:mb-0"></div>
        <div className="w-full md:w-1/5 mb-4 md:mb-0"></div>

        {/* Links Column 4 */}
        <div className="flex flex-col w-full md:w-1/5">
          <h4 className="text-sm font-semibold mb-2">Links</h4>
          <Link
            href="#"
            className="text-gray-600 hover:underline block mb-2"
            prefetch={false}
          >
            Incubate Nepal
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:underline block mb-2"
            prefetch={false}
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:underline block mb-2"
            prefetch={false}
          >
            Our Team
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:underline block"
            prefetch={false}
          >
            Paper
          </Link>
        </div>
      </div>
    </footer>
  );
}