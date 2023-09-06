// src/weather/weather.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  constructor(private readonly configService: ConfigService) {}

  async getWeather(city: string) {
    const apiKey = this.configService.get<string>('OPEN_WEATHER_API_KEY');
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      return {
        data
      };
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  }
}
