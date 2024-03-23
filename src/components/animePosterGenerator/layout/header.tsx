import { ModeToggle } from "@/components/theme-provider/modeToggle";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <Link type="button" href={"/"}>
          <h1 className="text-3xl ">Anime Poster Generator</h1>
        </Link>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
