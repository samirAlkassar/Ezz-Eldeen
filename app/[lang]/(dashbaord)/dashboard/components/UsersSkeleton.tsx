import React from 'react';

const UsersSkeleton = () => {
    return (
        <div className="space-y-4 md:space-y-6 animate-pulse">
            <div className="flex items-start justify-between">
                <div>
                    <div className="h-8 w-48 bg-slate-200 rounded-md mb-2"></div>
                    <div className="h-4 w-64 bg-slate-100 rounded-md"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-10 w-24 bg-slate-200 rounded-lg"></div>
                    <div className="h-10 w-32 bg-slate-200 rounded-lg"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 h-24">
                        <div className="h-5 w-24 bg-slate-100 rounded-md mb-3"></div>
                        <div className="h-8 w-12 bg-slate-200 rounded-md"></div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-4 flex justify-between items-center">
                    <div className="w-3/4 h-10 bg-slate-100 rounded-full"></div>
                    <div className="flex gap-2">
                        <div className="h-10 w-24 bg-slate-100 rounded-lg"></div>
                        <div className="h-10 w-24 bg-slate-100 rounded-lg"></div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="bg-slate-50 h-12 border-b border-slate-200"></div>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-16 border-b border-slate-100 flex items-center px-6 gap-4">
                            <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
                            <div className="h-4 w-32 bg-slate-100 rounded-md"></div>
                            <div className="ml-auto h-4 w-48 bg-slate-50 rounded-md"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UsersSkeleton;
