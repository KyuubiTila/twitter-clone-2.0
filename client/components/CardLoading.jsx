import React from 'react';

const CardLoading = () => {
  return (
    <div>
      <div className="border border-blue-100 shadow rounded-md p-4 w-full mx-auto my-3">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10" />
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2" />
                <div className="h-2 bg-slate-200 rounded col-span-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLoading;
