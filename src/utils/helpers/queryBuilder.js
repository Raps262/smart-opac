export const queryBuilder = {
  buildSearchQuery(params) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        searchParams.append(key, value);
      }
    });

    if (!searchParams.has("page")) {
      searchParams.append("page", "1");
    }
    if (!searchParams.has("limit")) {
      searchParams.append("limit", "10");
    }

    return searchParams.toString();
  },

  buildSearchUrl(basePath, params) {
    const query = this.buildSearchQuery(params);
    return query ? `${basePath}?${query}` : basePath;
  },
};
