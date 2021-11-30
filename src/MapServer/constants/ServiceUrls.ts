let BASE_URL = 'http://....';

/**
 * Absolute URL of REST endpoints of ArcGIS layers or services
 */
export class ServiceUrlsClass {
  constructor(private baseUrl: string) {
  }
}

const BaseUrl = BASE_URL;

const ServiceUrls = new ServiceUrlsClass(BASE_URL);

export {
  ServiceUrls,
  BaseUrl,
};
