import { Typography } from "@material-tailwind/react";

export default function Footme() {
    return (
        <div className="mx-[600px] border-t border-blue-gray-100/90 py-6">
            <span className="flex justify-center">
                <Typography color="blue-gray" className="text-center">
                    &copy; 2023 SaleHive |
                </Typography>
                <Typography
                    as="a"
                    href="#"
                    color="blue-gray"
                    className="text-center ml-2 transition-colors hover:text-[rgb(123,63,0)] focus:text-[rgb(123,63,0)]">
                    About Us
                </Typography>
            </span>
        </div>
    );
}