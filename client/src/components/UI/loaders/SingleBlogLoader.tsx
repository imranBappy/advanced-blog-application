export default function SingleBlogLoader() {
  return (
    <div className="w-full mb-6  col-span-12 sm:col-span-6 md:col-span-3 flex flex-col animate-pulse">
      <div className="relative">
        <div className="aspect-video rounded-md  bg-slate-200" />
      </div>
      <div className="flex flex-col my-2 space-y-1 grow">
        <p className="bg-slate-200 text-slate-200 text-[15px]">Loading...</p>
      </div>
      <div className="flex flex-col space-y-1 grow">
        <p className="bg-slate-200 text-slate-200 text-[6px]">Loading...</p>
        <p className="bg-slate-200 text-slate-200 text-[6px]">Loading...</p>
        <p className="bg-slate-200 text-slate-200 text-[6px]">Loading...</p>
        <p className="bg-slate-200 text-slate-200 text-[6px]">Loading...</p>
        <p className="bg-slate-200 text-slate-200 text-[6px]">Loading...</p>
        <p className="bg-slate-200 text-slate-200 text-[6px]">Loading...</p>
        <p className="bg-slate-200 text-slate-200 text-[6px]">Loading...</p>
        <p className="bg-slate-200 text-slate-200 text-[6px]">Loading...</p>
        <p className="bg-slate-200 text-slate-200 text-[6px]">Loading...</p>
      </div>

      <div className="flex flex-row mt-3 gap-2 items-center">
        <div className="bg-slate-200 rounded-full h-8 w-8 shrink-0" />

        <div className="flex gap-4  flex-wrap">
          <p className="bg-slate-200 w-40 text-slate-200 text-[18px]">
            Loading...
          </p>
          <p className="bg-slate-200 w-40 text-slate-200 text-[18px]">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}
