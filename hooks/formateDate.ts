function formatTimeAgo(dateString: string, addNew: string = ""): string {
    const now = new Date();
    const created = new Date(dateString);
    const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

    let result: string;

    if (diff < 60) {
        result = `${diff}s`;
    } else if (diff < 3600) {
        result = `${Math.floor(diff / 60)}m`;
    } else if (diff < 86400) {
        result = `${Math.floor(diff / 3600)}h`;
    } else if (diff < 2592000) {
        result = `${Math.floor(diff / 86400)}d`;
    } else if (diff < 31536000) {
        result = `${Math.floor(diff / 2592000)}mo`;
    } else {
        result = `${Math.floor(diff / 31536000)}y`;
    }

    if (diff < 86400) {
        result += addNew;
    }

    return result;
}

export default formatTimeAgo;
