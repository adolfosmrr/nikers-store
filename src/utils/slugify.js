export function slugify(str) {
    return str
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')         
        .replace(/[^\w\-]+/g, '')      
        .replace(/--+/g, '-');         
}