const veritabani = require("./indexController")
exports.getIndexController = async (req, res) => {
    try {
      const randomCitiesData = await veritabani.getRandomCitiesData();
      const restaurantData = await veritabani.getRestaurantData();
      res.render("index", { randomCitiesData: randomCitiesData, restaurantData:restaurantData});
    } catch (error) {
      console.error("index acilirken hata olustu:", error);
      res.status(500).send("Internal Server Error");
    }
  }