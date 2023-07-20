export const getCategoryPath = (results) => {
    const categoryPath = results.filters.find(filter => filter.id === 'category')

    if (categoryPath) {
        const value = categoryPath.values[0].path_from_root.map(cat => cat.name)
        return value.join(" > ")
    }else {
        return null
    }

}