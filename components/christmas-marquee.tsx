const Marquee = () => {
  return (
    <div className="w-full h-8 bg-red-500 overflow-hidden marquee-container fixed z-50 top-[66px]">
      <div className="flex absolute whitespace-nowrap animate-scroll-left marquee-track">
        <span className="mx-8 text-white font-bold marquee-content">
          🎄 EVO CHRISTMAS IS HERE! CHECK OUT CRAZY DISCOUNTS!!!
        </span>
        <span className="mx-8 text-white font-bold marquee-content">
          🎄 EVO CHRISTMAS IS HERE! CHECK OUT CRAZY DISCOUNTS!!!
        </span>
        <span className="mx-8 text-white font-bold marquee-content">
          🎄 EVO CHRISTMAS IS HERE! CHECK OUT CRAZY DISCOUNTS!!!
        </span>
        <span className="mx-8 text-white font-bold marquee-content">
          🎄 EVO CHRISTMAS IS HERE! CHECK OUT CRAZY DISCOUNTS!!!
        </span>
      </div>
    </div>
  );
};
export default Marquee;
