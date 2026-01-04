function SettingsTab() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
                <p className="text-sm text-slate-500 mt-1">Configure your dashboard preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">General Settings</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Store Name</label>
                            <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="My Store" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>EGP - Egyptian Pound</option>
                                <option>USD - US Dollar</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Notifications</h3>
                    <div className="space-y-4">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" defaultChecked />
                            <span className="text-sm text-slate-700">Email notifications</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" defaultChecked />
                            <span className="text-sm text-slate-700">Order updates</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                            <span className="text-sm text-slate-700">Low stock alerts</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SettingsTab;