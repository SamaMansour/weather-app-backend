import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  constructor(private readonly configService: ConfigService) {}

  async getWeather(city: string) {
    try {
      const apiKey = '871e86966ba8d7c07af3f1df5b06ee9b';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      const response = await axios.get(apiUrl);
      const data = response.data;

      return {
        data
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new HttpException('Failed to fetch weather data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
