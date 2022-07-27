let queryHelper = {
    buildQuery: (filters) => {
        finalSorting = {}
        finalFilters = {}

        if (filters["first_name"] !== "None") {
            finalFilters["first_name"] = filters["first_name"]
        }

        if (filters["last_name"] !== "None") {
            finalFilters["last_name"] = filters["last_name"]
        }

        if (filters.hasOwnProperty("tutor_rating") && parseInt(filters["tutor_rating"]) !== 0) {
            finalFilters["tutor rating"] = {"$gte": parseInt(filters["tutor_rating"])}
        }

        if (filters["major"] !== "None") {
            finalFilters["major 1"] = filters["major"]
        }

        if (filters["year"] !== "None") {
            finalFilters["year"] = filters["year"]
        }

        if ((filters.hasOwnProperty("order") && filters.hasOwnProperty("order2"))&&(filters["order"] !== "None" && filters["order2"] !== "None")) {
            finalSorting[`${filters["order"]}`] = (filters["order2"] === "Ascending") ? 1 : -1
        }

        return {"filterConfig": finalFilters, "sortingConfig": finalSorting}
    },
    queryParams: () => "/:first_name/:last_name/:tutor_rating/:major/:year/:order/:order2"
}

module.exports = queryHelper;