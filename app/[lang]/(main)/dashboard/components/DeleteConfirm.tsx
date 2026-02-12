import { Product } from "./Dashboard";

type DeleteConfirmProps = {
    product: Product;
    onCancel: () => void;
    onConfirm: () => void | Promise<void>;
};

function DeleteConfirm({ product, onCancel, onConfirm }: DeleteConfirmProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
                <h3 className="text-lg font-bold text-slate-800">Delete Product</h3>
                <p className="text-sm text-slate-600 mt-2">
                    Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.
                </p>
                <div className="flex items-center justify-end gap-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors duration-150"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-150"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirm;