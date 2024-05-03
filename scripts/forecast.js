class Forecast{
    constructor() {
        this.key = 'jGMilHRfLbvRV13ZVHO5cU9WFhxJZgLA';
        this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
        this.autoCitiesURI = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete';
    }
    async updateCity(city) {
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
    
        return {cityDets, weather};
    }
    async updateCitiesList(search) {
        const citySearch = await this.getAutoCities(search)

        return {citySearch}
    }
    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }
    async getWeather(id) {
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
    async getAutoCities(search) {
        const query = `?apikey=${this.key}&q=${search}`
        const response = await fetch(this.autoCitiesURI + query);
        const data = await response.json();
        return data
    }
}

const key = 'jGMilHRfLbvRV13ZVHO5cU9WFhxJZgLA'





