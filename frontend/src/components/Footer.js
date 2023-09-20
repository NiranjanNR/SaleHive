import { Typography } from "@material-tailwind/react";
 
export default function Footme() {
  return (
    <footer className="p-20 mt-10 flex w-full flex-row flex-wrap items-center justify-center gap-y-10 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <Typography color="blue-gray" className="font-normal">
        &copy; 2023 SaleHive
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-[rgb(123,63,0)] focus:text-[rgb(123,63,0)]"
          >
            About Us
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-[rgb(123,63,0)] focus:text-[rgb(123,63,0)]"
          >
            License
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-[rgb(123,63,0)] focus:text-[rgb(123,63,0)]"
          >
            Contribute
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-[rgb(123,63,0)] focus:text-[rgb(123,63,0)]"
          >
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
}