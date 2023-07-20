// @helpers
import { formatNumberToCurrency } from "../helpers/formatNumberToCurrency.js";
import { getCategoryPath } from "../helpers/getCategoryPath.js";

const getMercadoLibreItems = async (req, res) => {
    const query = req.query.q;

    try {
        const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
        const results = await response.json();
        const breadCrumb = getCategoryPath(results);
        const formattedResults = {
            author: {
                name: "Carlos",
                lastname: "Tello",
            },
            categories: breadCrumb,
            items: results.results.slice(0, 4).map((result) => ({
                id: result.id,
                title: result.title,
                price: {
                    currency: result.currency_id,
                    amount: formatNumberToCurrency(result.price),
                },
                picture: result.thumbnail,
                condition: result.condition,
                free_shipping: result.shipping.free_shipping,
            })),
        };
        res.json(formattedResults);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const [responseProductDetails, responseProductDescription] =
            await Promise.all([
                fetch(`https://api.mercadolibre.com/items/${id}`),
                fetch(`https://api.mercadolibre.com/items/${id}/description`),
            ]);

        const [resultsProductDetails, resultsProductDescription] =
            await Promise.all([
                responseProductDetails.json(),
                responseProductDescription.json(),
            ]);

        const formattedResults = {
            author: {
                name: "Carlos",
                lastname: "Tello",
            },
            item: {
                id: resultsProductDetails.id,
                title: resultsProductDetails.title,
                price: {
                    currency: resultsProductDetails.currency_id,
                    amount: formatNumberToCurrency(resultsProductDetails.price),
                },
                picture: resultsProductDetails.pictures[0].secure_url,
                condition: resultsProductDetails.condition,
                free_shipping: resultsProductDetails.shipping.free_shipping,
                sold_quantity: resultsProductDetails.sold_quantity,
                description: resultsProductDescription.plain_text,
            },
        };

        res.json(formattedResults);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

export { getMercadoLibreItems, getProductDetails };