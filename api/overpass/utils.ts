export const filterAttractions = (node) => node.tags
    && (node.tags.name || node.tags.operator)
    && node.id
    && node.lat && node.lon
