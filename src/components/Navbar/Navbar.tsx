import Logo from "../../assets/images/logomesa.png";

export const Navbar = () => {
  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex items-center hover:cursor-pointer">
              <img src={Logo} alt="MESA" className="h-10 w-auto lg:h-12" />
              <div className="ml-3">
                <h1 className="text-xl lg:text-2xl font-bold text-white uppercase">
                  FailTrack
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
