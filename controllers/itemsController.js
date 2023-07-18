const getMercadoLibreItems = async (req, res) => {
    const query = req.query.q;

    const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
    );

    const results = await response.json();


    const formattedResults = {
        author: {
            name: 'Carlos',
            lastname: 'Tello',
          },
          categories:results.filters,
          items:results.results.map((result) => (
            {
                id: result.id,
                title: result.title,
                price: {
                    currency: result.currency_id,
                    amount: result.installments.amount,
                },
                picture: result.thumbnail,
                condition: result.condition,
                free_shipping: result.shipping.free_shipping
            }
          ))

    }

    res.json(formattedResults);

};

export { getMercadoLibreItems };
