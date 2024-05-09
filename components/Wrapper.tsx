const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className='mx-auto w-full max-w-[1120px]'>{children}</div>;
};

export default Wrapper;
