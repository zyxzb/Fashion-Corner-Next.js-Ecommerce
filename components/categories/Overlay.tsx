const Overlay = ({ category }: { category: string }) => {
  return (
    <div className='absolute inset-0 flex items-center justify-center bg-base-100/0 transition-all duration-300 group-hover:bg-base-100/50'>
      <span className='translate-y-8 text-2xl font-semibold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
        {category}
      </span>
    </div>
  );
};

export default Overlay;
